var BaseMongoRepository = require('../src/repositories/base/baseMongoRepository').BaseMongoRepository;
var SecretMongoRepository = require('../src/repositories/secret/secretMongoRepository').SecretMongoRepository;

var BaseMongoPromiseRepository = require('../src/repositories/base/baseMongoPromiseRepository').BaseMongoPromiseRepository;
var SecretMongoPromiseRepository = require('../src/repositories/secret/secretMongoPromiseRepository').SecretMongoPromiseRepository;

var Models = require('../src/models/models').Models;


class PublicDBApi {

    // on the fly repository
    generateOnTheFlyRepository(data) {
        if (data.secret)
            return new SecretMongoPromiseRepository(data);
        return new BaseMongoPromiseRepository(data);
    }

    // model
    setModel(schema) {
        Models.setModel(schema);
        return istance;
    }

    /* old methods  */
    /**
     * @deprecated since version 3.0
     */
    getBaseMongoRepository() {
        Obsolete();
        return BaseMongoRepository;
    }
    /**
     * @deprecated since version 3.0
     */
    getSecretMongoRepository() {
        Obsolete();
        return SecretMongoRepository;
    }
    /**
     * @deprecated since version 3.0
     */
    getBaseMongoPromiseRepository() {
        Obsolete();
        return BaseMongoPromiseRepository;
    }
    /**
     * @deprecated since version 3.0
     */
    getSecretMongoPromiseRepository() {
        Obsolete();
        return SecretMongoPromiseRepository;
    }
}

const Obsolete = function () {
    console.warn("deprecationwarning: Please use the new On The Fly Repository. The old ones will always work but not all the version 3.0 new features are guaranteed.");
}

const istance = new PublicDBApi();
module.exports = {
    PublicDBApi: istance
}