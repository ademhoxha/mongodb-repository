import * as mongoose from 'mongoose';
import { SchemaFactory } from '../schema/schemaFactory';
import { MongooseProxyInterface, connectionOptions } from './mongooseProxyInterface';

var MongooseSchema = SchemaFactory.getSchema(true); // singleton


// static variable mongooseInstances
export class MongooseSingletonProxy implements MongooseProxyInterface {

    static mongooseInstances: any = {};
    private data: any;
    private mongooseSchema: any;

    constructor(extData: any) {
        this.data = extData;
    }

    openConnection(callback: (err: any) => void) {
        if (MongooseSingletonProxy.mongooseInstances[this.data.dbName] == null || MongooseSingletonProxy.mongooseInstances[this.data.dbName] == undefined) {
            MongooseSingletonProxy.mongooseInstances[this.data.dbName] = new mongoose.Mongoose();
            return MongooseSingletonProxy.mongooseInstances[this.data.dbName].connect(this.data.dbName, connectionOptions, (err: any) => {
                if (err)
                    return callback(err);
                this.mongooseSchema = new MongooseSchema(MongooseSingletonProxy.mongooseInstances[this.data.dbName], this.data.dbName);
                return callback(undefined);
            });
        }
        this.mongooseSchema = new MongooseSchema(MongooseSingletonProxy.mongooseInstances[this.data.dbName], this.data.dbName);
        return callback(undefined);
    }

    openSingletonConnection(callback : any){
        if (MongooseSingletonProxy.mongooseInstances[this.data.dbName] == null || MongooseSingletonProxy.mongooseInstances[this.data.dbName] == undefined) {
            MongooseSingletonProxy.mongooseInstances[this.data.dbName] = new mongoose.Mongoose();
            return MongooseSingletonProxy.mongooseInstances[this.data.dbName].connect(this.data.dbName, connectionOptions, (err: any) => {
                return callback(err); // if no error then err = undefined
            });
        }
    }

    getConnection() {
        return MongooseSingletonProxy.mongooseInstances[this.data.dbName];
    }

    getDb() {
        return MongooseSingletonProxy.mongooseInstances[this.data.dbName].connection;
    }

    getSchema() {
        this.mongooseSchema.getSchema(this.data.schemaName);
    }

    closeConnection(callback: (err: any) => void): void {
        this.getDb().close(true, callback);
    }

    connectionClosed(): void {
        MongooseSingletonProxy.mongooseInstances[this.data.dbName] = null;
        if (!this.mongooseSchema)
            this.mongooseSchema = new MongooseSchema(MongooseSingletonProxy.mongooseInstances[this.data.dbName], this.data.dbName);
        this.mongooseSchema.connectionClosed();
    }

    initializeSchema() {
        return this.mongooseSchema.getSchema(this.data.schemaName);
    }

}
