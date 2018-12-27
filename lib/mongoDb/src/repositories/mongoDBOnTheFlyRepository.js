class MongoDBOnTheFlyRepository {

    constructor(repository) {

        this.loadModel = (data) => repository.loadModel(data);
        this.closeSingletonConnection = () => repository.closeSingletonConnection();

        this.insert = (data) => repository.insert(data);
        this.find = (data) => repository.find(data);
        this.update = (data) => repository.update(data);
        this.remove = (data) => repository.remove(data);

    }

    /**
     * @Method: Load/Reload Model or Models.
     * @Param {JSON}
     * @Return {MongoDBOnTheFlyRepository}
     */
    loadModel(data) {
        return this
    }

    /**
     * @Method: Close the singleton connection if it is opened. 
     * Rejected if is not opened or is not a singleton connection.
     * @Return {Promise}
     */
    closeSingletonConnection() {
        return new Promise(null)
    }

    /**
     * @Method: Insert Operation.
     * @Param {JSON} {query : { fields : values}}
     * @Return {Promise}
     */
    insert(data) {
        return new Promise(null)
    }

    /**
     * @Method: Find Operation.
     * @Param {JSON} {query : { fields : values}}
     * @Return {Promise}
     */
    find(data) {
        return new Promise(null)
    }

    /**
     * @Method: Remove Operation.
     * @Param {JSON} {query : { fields : values}}
     * @Return {Promise}
     */
    remove(data) {
        return new Promise(null)
    }

    /**
     * @Method: Insert Operation.
     * @Param {JSON} {query : { fields : values}, update : { fieldsToUpdate : values}}
     * @Return {Promise}
     */
    update(data) {
        return new Promise(null)
    }

}

module.exports = {
    MongoDBOnTheFlyRepository: MongoDBOnTheFlyRepository
}