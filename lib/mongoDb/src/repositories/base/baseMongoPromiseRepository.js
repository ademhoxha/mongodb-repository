var BaseMongoRepository = require('./baseMongoRepository').BaseMongoRepository;

class BaseMongoPromiseRepository {

    constructor(data) {
        this.mongoRep = new BaseMongoRepository(data);
    }

    loadModel(data) {
        this.mongoRep.loadModel(data);
        return this;
    }

    closeSingletonConnection() {
        return new Promise((resolve, reject) => {
            this.mongoRep.closeSingletonConnection((err, ret) => {
                if (err)
                    reject(err); // rejected
                else
                    resolve(ret); // fulfilled
            })
        });
    }

    insert(data) {
        return new Promise((resolve, reject) => {
            this.mongoRep.insert(data, (err, ret) => {
                if (err)
                    reject(err); // rejected
                else
                    resolve(ret); // fulfilled
            })
        });
    }

    find(data) {
        var p = new Promise((resolve, reject) => {
            this.mongoRep.find(data, (err, ret) => {
                if (err)
                    reject(err); // rejected
                else
                    resolve(ret); // fulfilled
            })
        });
        return p;
    }

    remove(data) {
        return new Promise((resolve, reject) => {
            this.mongoRep.remove(data, (err, ret) => {
                if (err)
                    reject(err); // rejected
                else
                    resolve(ret); // fulfilled
            })
        });
    }

    update(data) {
        return new Promise((resolve, reject) => {
            this.mongoRep.update(data, (err, ret) => {
                if (err)
                    reject(err); // rejected
                else
                    resolve(ret); // fulfilled
            })
        });
    }
}
module.exports = {
    BaseMongoPromiseRepository: BaseMongoPromiseRepository
}