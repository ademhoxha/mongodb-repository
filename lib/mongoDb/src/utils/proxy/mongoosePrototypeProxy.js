var mongoose = require('mongoose');
var MongooseSchema = require('../schema/schemaFactory').SchemaFactory.getSchema(false); // prototype
var MongooseProxyInterface = require('./mongooseProxyInterface').MongooseProxyInterface;

class MongoosePrototypeProxy extends MongooseProxyInterface {

    constructor(extData) {
        super();
        this.data = extData;
        this.mongooseInstance = new mongoose.Mongoose();
        this.mongooseInstance.connect(this.data.dbName, MongooseProxyInterface.connectionOptions);
        this.mongooseSchema = new MongooseSchema(this.mongooseInstance);
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

    closeConnection(callback) {
        this.getDb().close(true, callback);
    }

    initializeSchema() {
        return this.mongooseSchema.getSchema(this.data.schemaName);
    }

}
module.exports = {
    MongoosePrototypeProxy: MongoosePrototypeProxy,

}