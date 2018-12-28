import * as mongoose from 'mongoose';
import { MongooseSchemaInterface } from './mongooseSchemaInterface';
import { Model } from '../model/model';

// static variable mongooseConnections
export class MongooseSingletonSchema implements MongooseSchemaInterface {

    private url : string = "";
    static mongooseConnections : any = {};

    constructor(mongooseConnection  : mongoose.Mongoose, url ?: string) {
        if(url)
            this.url = url;
        if (!MongooseSingletonSchema.mongooseConnections[this.url]) {
            MongooseSingletonSchema.mongooseConnections[this.url] = {};
            MongooseSingletonSchema.mongooseConnections[this.url].connection = mongooseConnection;
        }
        if (MongooseSingletonSchema.mongooseConnections[this.url].schemaList == null && MongooseSingletonSchema.mongooseConnections[this.url].schemaList == undefined)
            MongooseSingletonSchema.mongooseConnections[this.url].schemaList = {};
    }

    getSchema(schemaName : string) {
        if (MongooseSingletonSchema.mongooseConnections[this.url] && MongooseSingletonSchema.mongooseConnections[this.url].schemaList[schemaName])
            return MongooseSingletonSchema.mongooseConnections[this.url].schemaList[schemaName];
        else {
            var json = Model.getSchemaJson(schemaName)
            if (json) {
                MongooseSingletonSchema.mongooseConnections[this.url].schemaList[schemaName] = MongooseSingletonSchema.mongooseConnections[this.url].connection.model(schemaName, json);
                return MongooseSingletonSchema.mongooseConnections[this.url].schemaList[schemaName];
            } else {
                return new Error('Schema not Found');
            }
        }
    }

    connectionClosed(){
        MongooseSingletonSchema.mongooseConnections[this.url] = undefined;
    }

}
