class MongooseProxyInterface {

    constructor() {}

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