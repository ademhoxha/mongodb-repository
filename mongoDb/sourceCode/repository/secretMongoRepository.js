var BaseMongoRepository = require('./baseMongoRepository').BaseMongoRepository;
var cryptoAPI = require('../../../cryptoProvider/cryptoPublicApi/cryptoPublicApi');

class SecretMongoRepository extends BaseMongoRepository {

    constructor(data) {
        super(data);
        this.parameters = data.parameters;
        this.crypto = cryptoAPI.CTRCrypto(data);
    }

    insert(data, callback) {
        var newData = secretDataEncrypt(data, this.parameters, this.crypto);
        super.insert(newData, (err, ret) => {
            if (err)
                return callback(err);
            var retData = secretDataDecrypt(ret, this.parameters, this.crypto);
            return callback(err, retData);
        });
    }

    find(data, callback) {
        var newData = secretDataEncrypt(data, this.parameters, this.crypto);
        super.find(newData, (err, ret) => {
            if (err)
                return callback(err);
            var retData = secretDataDecrypt(ret, this.parameters, this.crypto);
            return callback(err, retData);
        });
    }

    remove(data, callback) {
        var newData = secretDataEncrypt(data, this.parameters, this.crypto);
        super.remove(newData, (err, ret) => {
            if (err)
                return callback(err);
            var retData = secretDataDecrypt(ret, this.parameters, this.crypto);
            return callback(err, retData);
        });
    }

    update(data, callback) {
        var newData = secretDataEncrypt(data, this.parameters, this.crypto);
        super.update(newData, (err, ret) => {
            if (err)
                return callback(err);
            var retData = secretDataDecrypt(ret, this.parameters, this.crypto);
            return callback(err, retData);
        });
    }

}

function secretDataEncrypt(startData, parameters, crypto) {
    var data = startData;
    parameters.forEach(element => {
        if (data.query && data.query[element]){
            data.query[element] = crypto.encrypt(data.query[element])
        }
        if (data.update && data.update[element]){
            data.update[element] = crypto.encrypt(data.update[element])
        }
    });
    return data;
}

function secretDataDecrypt(startData, parameters, crypto) {
    var returnData = startData;
    if (returnData && returnData instanceof Array) {
        returnData.forEach(data => {
            parameters.forEach(element => {
                if (data[element]){
                    data[element] = crypto.decrypt(data[element])
                }
                if (data.query && data.query[element]){
                    data.query[element] = crypto.decrypt(data.query[element])
                }
                if (data.update && data.update[element]){
                    data.update[element] = crypto.decrypt(data.update[element])
                }
            });
        });
    }
    else if (returnData) {
        parameters.forEach(element => {
            if (returnData[element]){
                returnData[element] = crypto.decrypt(returnData[element])
            }
            if (returnData.query && returnData.query[element]){
                returnData.query[element] = crypto.decrypt(returnData.query[element])
            }
            if (returnData.update && returnData.update[element]){
                returnData.update[element] = crypto.decrypt(returnData.update[element])
            }
        });
    }

    return returnData;
}

module.exports = {
    SecretMongoRepository: SecretMongoRepository
}