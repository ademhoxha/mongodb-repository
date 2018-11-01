var mongoose = require('mongoose');
var mongooseSchema = require('./mongooseSchema').mongooseSchema;

class mongooseProxy {

    constructor(extData) {
        this.data = extData;
        this.mongooseInstance = new mongoose.Mongoose();
        this.mongooseInstance.connect(this.data.dbName);
        this.mongooseSchema = new mongooseSchema(this.mongooseInstance);
    }

    getConnection(){
        return this.mongooseInstance;
    }

    getDb(){
        return this.mongooseInstance.connection;
    }

    getSchema(){
        this.mongooseSchema.getSchema(this.data.schemaName);
    }

    closeConnection(callback){
        this.getDb().close(true,callback);
        //this.getConnection().disconnect(callback);
    }

    openConnection(callback){
        this.getDb().on('error',  function () {
            return callback(new Error("Can't Get Connection to Mongo"));
        });
        this.getDb().once('open', function () { 
            return callback(null, 'Connection Open');
        });
    }

    initializeSchema(){
        return this.mongooseSchema.getSchema(this.data.schemaName);
    }

}
module.exports = {
    mongooseProxy : mongooseProxy,

}