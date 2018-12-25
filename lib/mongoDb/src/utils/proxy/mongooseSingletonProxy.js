var mongoose = require('mongoose');
var MongooseSchema = require('../schema/schemaFactory').SchemaFactory.getSchema(true); // singleton
var MongooseProxyInterface = require('./mongooseProxyInterface').MongooseProxyInterface;

// static variable mongooseInstances
class MongooseSingletonProxy extends MongooseProxyInterface {

    constructor(extData) {
        super();
        this.data = extData;
        if (MongooseSingletonProxy.mongooseInstances[this.data.dbName] == null || MongooseSingletonProxy.mongooseInstances[this.data.dbName] == undefined) {
            MongooseSingletonProxy.mongooseInstances[this.data.dbName] = new mongoose.Mongoose();
            MongooseSingletonProxy.mongooseInstances[this.data.dbName].connect(this.data.dbName, {
                useNewUrlParser: true
            });
        }
        this.mongooseSchema = new MongooseSchema(MongooseSingletonProxy.mongooseInstances[this.data.dbName], this.data.dbName);
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

    openConnection(callback) {
        return callback(null, 'Connection Open');
    }

    closeConnection(callback) {
        this.getDb().close(true, callback);
    }

    connectionClosed() {
        MongooseSingletonProxy.mongooseInstances[this.data.dbName] = null;
        this.mongooseSchema.connectionClosed();
    }

    initializeSchema() {
        return this.mongooseSchema.getSchema(this.data.schemaName);
    }

}
MongooseSingletonProxy.mongooseInstances = {}

module.exports = {
    MongooseSingletonProxy: MongooseSingletonProxy,

}