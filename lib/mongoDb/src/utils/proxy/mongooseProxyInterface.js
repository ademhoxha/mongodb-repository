class MongooseProxyInterface {

    constructor() {}

    openConnection(callback) {}

    getConnection() {}

    getDb() {}

    getSchema() {}

    closeConnection(callback) {}
    
    initializeSchema() {}

}

MongooseProxyInterface.connectionOptions = {
    useNewUrlParser: true,
    useFindAndModify: false
}

module.exports = {
    MongooseProxyInterface: MongooseProxyInterface
}