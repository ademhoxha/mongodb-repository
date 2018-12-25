var BaseMongoPromiseRepository = require('../src/repositories/base/baseMongoPromiseRepository').BaseMongoPromiseRepository;
var SecretMongoPromiseRepository = require('../src/repositories/secret/secretMongoPromiseRepository').SecretMongoPromiseRepository;

var Models = require('../src/models/models').Models;


class OnTheFlyRepositoryFactory {

    // on the fly repository factory
    generateOnTheFlyRepository(data) {
        if (data.secret)
            return new SecretMongoPromiseRepository(data);
        return new BaseMongoPromiseRepository(data);
    }

    // model
    loadModel(schema) {
        Models.setModel(schema);
        return istance;
    }
}

const istance = new OnTheFlyRepositoryFactory();
module.exports = {
    OnTheFlyRepositoryFactory: istance
}