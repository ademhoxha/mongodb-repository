var BaseMongoRepository = require('../src/repositories/base/baseMongoRepository').BaseMongoRepository;
var SecretMongoRepository = require('../src/repositories/secret/secretMongoRepository').SecretMongoRepository;

var BaseMongoPromiseRepository = require('../src/repositories/base/baseMongoPromiseRepository').BaseMongoPromiseRepository;
var SecretMongoPromiseRepository = require('../src/repositories/secret/secretMongoPromiseRepository').SecretMongoPromiseRepository;

var Models = require('../src/models/models').Models;

/**
 * @deprecated since version 3.0
 */
class PublicDBApi {
    setModel(schema) {
        Models.setModel(schema);
        return istance;
    }
    getBaseMongoRepository() {
        Obsolete();
        return BaseMongoRepository;
    }
    getSecretMongoRepository() {
        Obsolete();
        return SecretMongoRepository;
    }
    getBaseMongoPromiseRepository() {
        Obsolete();
        return BaseMongoPromiseRepository;
    }
    getSecretMongoPromiseRepository() {
        Obsolete();
        return SecretMongoPromiseRepository;
    }
}

const Obsolete = function () {
    console.warn("Deprecationwarning: Please use the new On The Fly Repository Factory. This one will always work but not all the version 3.0 (or later) new features are guaranteed.");
}

const istance = new PublicDBApi();
module.exports = {
    PublicDBApi: istance
}