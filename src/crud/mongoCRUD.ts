import * as mongooseProxyInterface from '../proxy/mongooseProxyInterface';

export class MongoCRUD {

    private singleton: boolean;
    private mongooseProxy: mongooseProxyInterface.MongooseProxyInterface;

    constructor(data: any) {
        this.mongooseProxy = data.mongooseProxy;
        this.singleton = data.singleton;
    }

    insert(userData: any, callback: (err: any, ret: any) => void) {
        var data = userData;
        data.mongooseProxy = this.mongooseProxy;
        this.startMongoOperationFlow(data, addInMongo, callback);
    }

    find(userData: any, callback: (err: any, ret: any) => void) {
        var data = userData;
        data.mongooseProxy = this.mongooseProxy;
        this.startMongoOperationFlow(data, searchInMongo, callback);
    }

    remove(userData: any, callback: (err: any, ret: any) => void) {
        var data = userData;
        data.mongooseProxy = this.mongooseProxy;
        this.startMongoOperationFlow(data, removeInMongo, callback);
    }

    update(userData: any, callback: (err: any, ret: any) => void) {
        var data = userData;
        data.mongooseProxy = this.mongooseProxy;
        this.startMongoOperationFlow(data, updateInMongo, callback);
    }

    initializeModel() {
        this.mongooseProxy.getSchema();
    }

    startMongoOperationFlow(data: any, operation: (err: any, ret: any) => void, callback: (err: any, ret: any) => void) {
        return this.executeOperation(data, operation, callback)
    }

    executeOperation(data: any, operation: (err: any, ret: any) => void, callback: (err: any, ret: any) => void) {
        operation(data, (err: any, info: any) => {
            if (err)
                return callback(err, undefined)
            return this.closeConnection(info, callback)
        })
    }

    closeConnection(data: any, callback: (err: any, ret: any) => void) {
        if (!this.singleton)
            return this.execClose(data, callback);
        return callback(undefined, data);
    }

    execClose(data: any, callback: (err: any, ret: any) => void) {
        return this.mongooseProxy.closeConnection((err: any) => {
            if (err)
                return callback(err, undefined);
            return callback(undefined, data)
        });
    }

}

function addInMongo(data: any, callback: (err: any, ret: any) => void) {
    var mongo = data.mongooseProxy;
    var schema = mongo.initializeSchema();
    var element = new schema(data.query);
    element.save((err: any, item: any) => {
        if (err)
            return callback(err, undefined);
        return callback(undefined, item);
    });
}

function searchInMongo(data: any, callback: (err: any, ret: any) => void) {
    var mongo = data.mongooseProxy;
    var schema = mongo.initializeSchema();
    schema.find(data.query, (err: any, item: any) => {
        if (err)
            return callback(err, undefined);
        return callback(undefined, item);
    });
}

function removeInMongo(data: any, callback: (err: any, ret: any) => void) {
    var mongo = data.mongooseProxy;
    var schema = mongo.initializeSchema();
    schema.deleteMany(data.query, (err: any, item: any) => {
        if (err)
            return callback(err, undefined);
        return callback(undefined, item);
    });
}

function updateInMongo(data: any, callback: (err: any, ret: any) => void) {
    var mongo = data.mongooseProxy;
    var schema = mongo.initializeSchema();
    schema.updateMany(data.query, data.update, (err: any, item: any) => {
        if (err)
            return callback(err, undefined);
        return callback(undefined, item);
    });
}
