
class mongoCRUD {
    constructor(mongooseProxy) {
        this.mongooseProxy = mongooseProxy;
    }

    insert(userData, callback) {
        var data = userData;
        data.mongooseProxy = this.mongooseProxy;
        this.startMongoOperationFlow(data, addInMongo, callback);
    }

    find(userData, callback) {
        var data = userData;
        data.mongooseProxy = this.mongooseProxy;
        this.startMongoOperationFlow(data, searchInMongo, callback);
    }

    remove(userData, callback) {
        var data = userData;
        data.mongooseProxy = this.mongooseProxy;
        this.startMongoOperationFlow(data, removeInMongo, callback);
    }

    update(userData, callback) {
        var data = userData;
        data.mongooseProxy = this.mongooseProxy;
        this.startMongoOperationFlow(data, updateInMongo, callback);
    }

    initializeModel() {
        this.mongooseProxy.getSchema();
    }

    startMongoOperationFlow(data, operation, callback) {
        this.getConnection(data, (err, ret) => {
            if (err)
                return callback(err)
            return this.executeOperation(data, operation, callback)
        })
    }

    executeOperation(data, operation, callback) {
        operation(data, (err, info) => {
            if (err)
                return callback(err)
            return this.closeConnection(info, callback)
        })
    }

    getConnection(data, callback) {
        this.mongooseProxy.openConnection((error, info) => {
            if (error)
                return callback(error);
            return callback(undefined, info)
        });
    }

    closeConnection(data, callback) {
        this.mongooseProxy.closeConnection((err, info) => {
            callback(undefined, data)
        });
    }


}




function addInMongo(data, callback) {
    var mongo = data.mongooseProxy;
    var schema = mongo.initializeSchema();
    var element = new schema(data.query);
    element.save( (err, item)  =>  {
        if (err)
            return callback(err);
        return callback(undefined, item);
    });
}

function searchInMongo(data, callback) {
    var mongo = data.mongooseProxy;
    var schema = mongo.initializeSchema();
    schema.find(data.query, (err, item) => {
        if (err)
            return callback(err);
        return callback(undefined, item);
    });
}

function removeInMongo(data, callback) {
    var mongo = data.mongooseProxy;
    var schema = mongo.initializeSchema();
    schema.remove(data.query,(err, item) => {
        if (err)
            return callback(err);
        return callback(undefined, item);
    });
}

function updateInMongo(data, callback) {
    var mongo = data.mongooseProxy;
    var schema = mongo.initializeSchema();
    schema.findOneAndUpdate(data.query, data.update, (err, item) => {
        if (err)
            return callback(err);
        return callback(undefined, item);
    });
}


module.exports = {
    mongoCRUD: mongoCRUD
}