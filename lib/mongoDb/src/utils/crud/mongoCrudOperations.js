var MongoCRUD = require('./mongoCRUD').MongoCRUD;

class MongoCrudOperations {

    constructor(data, mongooseProxy) {
        // db and schema information
        this.dbName = data.dbName;
        this.schemaName = data.schemaName;
        // CRUD validation => not used yet TODO
        this.validateAddQuery = data.validateAddQuery;
        this.validateFindQuery = data.validateFindQuery;
        this.validateDelQuery = data.validateDelQuery;
        this.validateUpdQuery = data.validateUpdQuery;
        // mongoose istance
        this.mongooseProxy = mongooseProxy;
        // new CRUD operation
        this.mongoOperation = new MongoCRUD({
            'mongooseProxy': mongooseProxy,
            'singleton': data.singleton
        });
    }

    find(userData, callback) {
        var data = this.completeData(userData);
        this.mongoOperation.find(data, callback);
    }

    update(userData, callback) {
        var data = this.completeData(userData);
        this.mongoOperation.update(data, callback);
    }

    remove(userData, callback) {
        var data = this.completeData(userData);
        this.mongoOperation.remove(data, callback);
    }

    insert(userData, callback) {
        var data = this.completeData(userData);
        this.mongoOperation.insert(data, callback);
    }

    closeSingletonConnection(callback) {
        var data = this.completeData({});
        this.mongoOperation.execClose(data, callback);
    }

    completeData(userData) {
        var data = userData;
        data.mongooseProxy = this.mongooseProxy;
        data.schemaName = this.schemaName;
        data.dbName = this.dbName;
        return data;
    }

}

module.exports = {
    MongoCrudOperations: MongoCrudOperations
}