var BaseMongoRepository = require('../sourceCode/repository/baseMongoRepository').BaseMongoRepository;
var SecretMongoRepository = require('../sourceCode/repository/secretMongoRepository').SecretMongoRepository;
var models = require('../sourceCode/models/models').Models;


class publicDBApi {
    
    getBaseMongoRepository(){
       return BaseMongoRepository;
    }
    getSecretMongoRepository(){
        return SecretMongoRepository;
    }
    setModel(schema) {
        models.setModel(schema);
    }
}

var istance = new publicDBApi();

module.exports = {
    publicDBApi : istance
}
