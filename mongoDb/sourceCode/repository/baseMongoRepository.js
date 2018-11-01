var mongoCrudOperations = require('../mongoDB/mongoCrudOperations').mongoCrudOperations;
var mongooseProxy = require('../mongoDB/mongooseProxy').mongooseProxy;

class BaseMongoRepository {

    constructor(data){
        this.mongo = null;
        this.mongoCrud = null;
        this.dbName = data.dbName;
        this.schemaName = data.schemaName;
    }

    initialize(){
        var data = {};
        data.dbName = this.dbName;
        data.schemaName = this.schemaName;
        this.mongo = new mongooseProxy(data);
        this.mongoCrud = new mongoCrudOperations(data, this.mongo);
    }

    insert(data, callback) {
        this.initialize();
        this.mongoCrud.insert(data, callback);
    }

    find(data, callback) {
        this.initialize();
        this.mongoCrud.find(data, callback);
    }

    remove(data, callback) {
        this.initialize();
        this.mongoCrud.remove(data, callback);
    }

    update(data, callback) {
        this.initialize();
        this.mongoCrud.update(data, callback);
    }

}

module.exports = {
    BaseMongoRepository : BaseMongoRepository
}