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

        if (!this.isInitialized){
            var data = {};
            data.dbName = this.dbName;
            data.schemaName = this.schemaName;
            data.singleton = this.singleton;
            let MongooseProxy = MongooseProxyFactory.generateProxy(this.singleton);
            this.mongo = new MongooseProxy(data);
            if(!this.mongo.getConnection() || this.mongo.getConnection()== null)
                return callback(ErrorFactory.notSingletonConnectionOpened());
        }

        return this.mongo.openConnection((err) => {
            if (err)
                return callback(err);
            this.mongoCrud = new MongoCrudOperations(data, this.mongo);

            this.mongoCrud.closeSingletonConnection((err) => {
                if (err)
                    return callback(err);
                this.mongo.connectionClosed();
                return callback(undefined)
            });
        });
    }

    initialize(callback) {
        var data = {};
        data.dbName = this.dbName;
        data.schemaName = this.schemaName;
        data.singleton = this.singleton;
        let MongooseProxy = MongooseProxyFactory.generateProxy(this.singleton);
        this.mongo = new MongooseProxy(data);
        return this.mongo.openConnection((err) => {
            if (err)
                return callback(err);
            this.mongoCrud = new MongoCrudOperations(data, this.mongo);
            this.isInitialized = true;
            return callback(undefined);
        });
    }

    insert(data, callback) {
        if (!this.singleton || !this.isInitialized)
            return this.initialize((err) => {
                if (err)
                    return callback(err)
                this.mongoCrud.insert(data, callback);
            });

        this.mongoCrud.insert(data, callback);
    }

    find(data, callback) {
        if (!this.singleton || !this.isInitialized)
            return this.initialize((err) => {
                if (err)
                    return callback(err)
                this.mongoCrud.find(data, callback);
            });

        this.mongoCrud.find(data, callback);
    }

    remove(data, callback) {
        if (!this.singleton || !this.isInitialized)
            return this.initialize((err) => {
                if (err)
                    return callback(err)
                this.mongoCrud.remove(data, callback);
            });

        this.mongoCrud.remove(data, callback);
    }

    update(data, callback) {
        if (!this.singleton || !this.isInitialized)
            return this.initialize((err) => {
                if (err)
                    return callback(err)
                this.mongoCrud.update(data, callback);
            });

        this.mongoCrud.update(data, callback);
    }

}

module.exports = {
    BaseMongoRepository: BaseMongoRepository
}