// set schema into a model
const Models = require('../../models/models').Models;

// static variable mongooseConnections
class MongooseSingletonSchema {
    constructor(mongooseConnection, url) {
        this.url = url;
        if (!MongooseSingletonSchema.mongooseConnections[this.url]) {
            MongooseSingletonSchema.mongooseConnections[this.url] = {};
            MongooseSingletonSchema.mongooseConnections[this.url].connection = mongooseConnection;
        }
        if (MongooseSingletonSchema.mongooseConnections[this.url].schemaList == null && MongooseSingletonSchema.mongooseConnections[this.url].schemaList == undefined)
            MongooseSingletonSchema.mongooseConnections[this.url].schemaList = {};
    }

    getSchema(schemaName) {
        if (MongooseSingletonSchema.mongooseConnections[this.url] && MongooseSingletonSchema.mongooseConnections[this.url].schemaList[schemaName])
            return MongooseSingletonSchema.mongooseConnections[this.url].schemaList[schemaName];
        else {
            var json = Models.getSchemaJson(schemaName)
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
MongooseSingletonSchema.mongooseConnections = {};

module.exports = {
    MongooseSingletonSchema: MongooseSingletonSchema
}