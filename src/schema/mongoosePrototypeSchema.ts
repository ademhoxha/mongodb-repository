import * as mongoose from 'mongoose';
import { Model } from '../model/model';
import { MongooseSchemaInterface } from './mongooseSchemaInterface';

export class MongoosePrototypeSchema implements MongooseSchemaInterface {
    private mongoose : mongoose.Mongoose;
    private schemaList : any = {};

    constructor(mongoose : mongoose.Mongoose) {
        this.mongoose = mongoose;
    }

    getSchema(schemaName : any) : any{
        if (this.schemaList[schemaName])
            return this.schemaList[schemaName];
        else {
            var json = Model.getSchemaJson(schemaName)
            if (json) {
                this.schemaList[schemaName] = this.mongoose.model(schemaName, json);
                return this.schemaList[schemaName];
            } else {
                return new Error('Schema not Found');
            }
        }
    }

    connectionClosed(): void {
        throw new Error("Method not implemented.");
    }

}
