var MongoCrudOperations = require('../../utils/crud/mongoCrudOperations').MongoCrudOperations;
const MongooseProxyFactory = require('../../utils/proxy/mongooseProxyFactory').MongooseProxyFactory;
const Models = require('../../models/models').Models;
const ErrorFactory = require('../../errors/errors').ErrorFactory;

class BaseMongoRepository {

    constructor(data) {
        this.mongo = null;
        this.mongoCrud = null;
        this.dbName = data.dbName;
        if (data.url)
            this.dbName = data.url;
        this.schemaName = data.schemaName;
        this.singleton = data.singleton;
        this.isInitialized = false;
    }

    loadModel(data) {
        Models.setModel(data);
        return this;
    }

    closeSingletonConnection(callback) {
        if (!this.singleton)
            return callback(ErrorFactory.notSingletonIstance())

        if (!this.singleton || !this.isInitialized)
            this.initialize();
        this.mongoCrud.closeSingletonConnection((err, ret) => {
            if (err)
                return callback(err, undefined);
            this.mongo.connectionClosed();
            return callback(undefined)
        });
    }

    initialize() {
        var data = {};
        this.isInitialized = true;
        data.dbName = this.dbName;
        data.schemaName = this.schemaName;
        data.singleton = this.singleton;
        let MongooseProxy = MongooseProxyFactory.generateProxy(this.singleton);
        this.mongo = new MongooseProxy(data);
        this.mongoCrud = new MongoCrudOperations(data, this.mongo);
    }

    insert(data, callback) {
        if (!this.singleton || !this.isInitialized)
            this.initialize();
        this.mongoCrud.insert(data, callback);
    }

    find(data, callback) {
        if (!this.singleton || !this.isInitialized)
            this.initialize();
        this.mongoCrud.find(data, callback);
    }

    remove(data, callback) {
        if (!this.singleton || !this.isInitialized)
            this.initialize();
        this.mongoCrud.remove(data, callback);
    }

    update(data, callback) {
        if (!this.singleton || !this.isInitialized)
            this.initialize();
        this.mongoCrud.update(data, callback);
    }

}

module.exports = {
    BaseMongoRepository: BaseMongoRepository
}