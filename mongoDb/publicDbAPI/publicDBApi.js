var BaseMongoRepository = require('../sourceCode/repository/baseMongoRepository').BaseMongoRepository;
var SecretMongoRepository = require('../sourceCode/repository/secretMongoRepository').SecretMongoRepository;

var BaseMongoPromiseRepository = require('../sourceCode/repository/baseMongoPromiseRepository').BaseMongoPromiseRepository;
var SecretMongoPromiseRepository = require('../sourceCode/repository/secretMongoPromiseRepository').SecretMongoPromiseRepository;

var models = require('../sourceCode/models/models').Models;


class publicDBApi {
    
    getBaseMongoRepository(){
       return BaseMongoRepository;
    }
    getSecretMongoRepository(){
        return SecretMongoRepository;
    }

    getBaseMongoPromiseRepository(){
        return BaseMongoPromiseRepository;
     }
     getSecretMongoPromiseRepository(){
        return SecretMongoPromiseRepository;
     }


    setModel(schema) {
        models.setModel(schema);
    }
}

var istance = new publicDBApi();

module.exports = {
    publicDBApi : istance
}
