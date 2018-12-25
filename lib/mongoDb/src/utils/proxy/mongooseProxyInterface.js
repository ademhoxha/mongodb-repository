class MongooseProxyInterface {

    constructor() {}

    getConnection() {}

    getDb() {}

    getSchema() {}

    closeConnection(callback) {}

    openConnection(callback) {}

    initializeSchema() {}

}
module.exports = {
    MongooseProxyInterface: MongooseProxyInterface
}