//var MongooseSchema = require('../schema/schemaFactory').SchemaFactory.getSchema(false); // prototype
import * as mongoose from 'mongoose';
import { SchemaFactory } from '../schema/schemaFactory';
import { MongooseProxyInterface, connectionOptions } from './mongooseProxyInterface';

var MongooseSchema = SchemaFactory.getSchema(false); // prototype

export class MongoosePrototypeProxy implements MongooseProxyInterface {

    private data: any;
    private mongooseInstance: mongoose.Mongoose;
    private mongooseSchema : any;

    constructor(extData: any) {
        this.data = extData;
        this.mongooseInstance = new mongoose.Mongoose();
    }

    openConnection(callback: (err: any) => void) {
        return this.mongooseInstance.connect(this.data.dbName, connectionOptions, (err: any) => {
            if (err)
                return callback(err);
            this.mongooseSchema = new MongooseSchema(this.mongooseInstance);
            return callback(undefined);
        });
    }

    getConnection() {
        return this.mongooseInstance;
    }

    getDb() {
        return this.mongooseInstance.connection;
    }

    getSchema() {
        this.mongooseSchema.getSchema(this.data.schemaName);
    }

    closeConnection(callback: (err: any) => void) {
        this.getDb().close(true, callback);
    }

    initializeSchema() {
        return this.mongooseSchema.getSchema(this.data.schemaName);
    }

}
