var mongoose = require('mongoose');
var MongooseSchema = require('../schema/schemaFactory').SchemaFactory.getSchema(false); // prototype
var MongooseProxyInterface = require('./mongooseProxyInterface').MongooseProxyInterface;

class MongoosePrototypeProxy extends MongooseProxyInterface {

    constructor(extData) {
        super();
        this.data = extData;
        this.mongooseInstance = new mongoose.Mongoose();
        this.mongooseInstance.connect(this.data.dbName, {
            useNewUrlParser: true
        });
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
        //this.getConnection().disconnect(callback);
    }

    openConnection(callback) {
        /* this.getDb().on('error',  function () {
             return callback(new Error("Can't Get Connection to Mongo"));
         });
         this.getDb().once('open', function () { 
             return callback(null, 'Connection Open');
         });*/
        return callback(null, 'Connection Open');
    }

    initializeSchema() {
        return this.mongooseSchema.getSchema(this.data.schemaName);
    }

}
module.exports = {
    MongoosePrototypeProxy: MongoosePrototypeProxy,

}