var SecretMongoRepository = require('./secretMongoRepository').SecretMongoRepository;

class SecretMongoPromiseRepository {

    constructor(data) {
        this.mongoRep = new SecretMongoRepository(data);
    }

    insert(data) {
        return new Promise((resolve, reject) => {
            this.mongoRep.insert(data, (err, ret) => {
                if(err)
                    reject(err); // rejected
                else
                    resolve(ret); // fulfilled
            })
        });
    }

    find(data) {
        return new Promise((resolve, reject) => {
            this.mongoRep.find(data, (err, ret) => {
                if(err)
                    reject(err); // rejected
                else
                    resolve(ret); // fulfilled
            })
        });
    }

    remove(data) {
        return new Promise((resolve, reject) => {
            this.mongoRep.remove(data, (err, ret) => {
                if(err)
                    reject(err); // rejected
                else
                    resolve(ret); // fulfilled
            })
        });
    }

    update(data) {
        return new Promise((resolve, reject) => {
            this.mongoRep.update(data, (err, ret) => {
                if(err)
                    reject(err); // rejected
                else
                    resolve(ret); // fulfilled
            })
        });
    }
}
module.exports = {
    SecretMongoPromiseRepository: SecretMongoPromiseRepository
}