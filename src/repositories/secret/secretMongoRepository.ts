import { BaseMongoRepository } from "../base/baseMongoRepository";
import { CryptoFactory } from "../../crypto/cryptoFactory";
import { BaseCryptoApi } from "../../crypto/baseCryptoApi";
import { RepositoryUtils } from "../../utils/repositoryUtils";
import { ErrorFactory } from "../../errors/errors";

export class SecretMongoRepository extends BaseMongoRepository {

    private parameters: [];
    private crypto: BaseCryptoApi;

    constructor(data: any) {
        super(data);
        this.parameters = data.parameters;
        this.crypto = CryptoFactory.getCTRCrypto(data);
    }

    loadModel(data: any): SecretMongoRepository {
        super.loadModel(data);
        return this;
    }

    openSingletonConnection(callback: (err: any, ) => void) {
        return super.openSingletonConnection(callback);
    }

    closeSingletonConnection(callback: (err: any, ) => void) {
        return super.closeSingletonConnection(callback);
    }

    insert(data: any, callback: Function) {
        if (!RepositoryUtils.areValidateCryptoParameters(this.parameters))
            return callback(ErrorFactory.cryptoParameterNotValid(), undefined);

        let cp = super.checkRepositoryParameters(true);
        if (cp)
            return callback(cp, undefined);

        cp = super.checkQueryParameters(data, false, true);
        if (cp)
            return callback(cp, undefined);

        var newData: any = secretDataEncrypt(data, this.parameters, this.crypto);
        super.insert(newData, (err: any, ret: any) => {
            if (err)
                return callback(err);
            var retData = secretDataDecrypt(ret, this.parameters, this.crypto);
            return callback(err, retData);
        });
    }

    find(data: any, callback: Function) {
        if (!RepositoryUtils.areValidateCryptoParameters(this.parameters))
            return callback(ErrorFactory.cryptoParameterNotValid(), undefined);

        let cp = super.checkRepositoryParameters(true);
        if (cp)
            return callback(cp, undefined);

        cp = super.checkQueryParameters(data, false, false);
        if (cp)
            return callback(cp, undefined);

        var newData = secretDataEncrypt(data, this.parameters, this.crypto);
        super.find(newData, (err: any, ret: any) => {
            if (err)
                return callback(err);
            var retData = secretDataDecrypt(ret, this.parameters, this.crypto);
            return callback(err, retData);
        });
    }

    remove(data: any, callback: Function) {
        if (!RepositoryUtils.areValidateCryptoParameters(this.parameters))
            return callback(ErrorFactory.cryptoParameterNotValid(), undefined);

        let cp = super.checkRepositoryParameters(true);
        if (cp)
            return callback(cp, undefined);

        cp = super.checkQueryParameters(data, false, false);
        if (cp)
            return callback(cp, undefined);

        var newData: any = secretDataEncrypt(data, this.parameters, this.crypto);
        super.remove(newData, (err: any, ret: any) => {
            if (err)
                return callback(err);
            var retData = secretDataDecrypt(ret, this.parameters, this.crypto);
            return callback(err, retData);
        });
    }

    update(data: any, callback: Function) {
        if (!RepositoryUtils.areValidateCryptoParameters(this.parameters))
            return callback(ErrorFactory.cryptoParameterNotValid(), undefined);

        let cp = super.checkRepositoryParameters(true);
        if (cp)
            return callback(cp, undefined);

        cp = super.checkQueryParameters(data, true, false);
        if (cp)
            return callback(cp, undefined);

        var newData: any = secretDataEncrypt(data, this.parameters, this.crypto);
        super.update(newData, (err: any, ret: any) => {
            if (err)
                return callback(err);
            var retData = secretDataDecrypt(ret, this.parameters, this.crypto);
            return callback(err, retData);
        });
    }

}

function secretDataEncrypt(startData: any, parameters: [], crypto: any) {
    var data = startData;
    if (parameters) {
        parameters.forEach(element => {
            if (data.query && data.query[element]) {
                data.query[element] = crypto.encrypt(data.query[element])
            }
            if (data.update && data.update[element]) {
                data.update[element] = crypto.encrypt(data.update[element])
            }
        });
    }
    return data;
}

function secretDataDecrypt(startData: any, parameters: [], crypto: any) {
    var returnData = startData;
    if (returnData && returnData instanceof Array && parameters) {
        returnData.forEach(data => {
            parameters.forEach(element => {
                if (data[element]) {
                    data[element] = crypto.decrypt(data[element])
                }
                if (data.query && data.query[element]) {
                    data.query[element] = crypto.decrypt(data.query[element])
                }
                if (data.update && data.update[element]) {
                    data.update[element] = crypto.decrypt(data.update[element])
                }
            });
        });
    } else if (returnData && parameters) {
        parameters.forEach(element => {
            if (returnData[element]) {
                returnData[element] = crypto.decrypt(returnData[element])
            }
            if (returnData.query && returnData.query[element]) {
                returnData.query[element] = crypto.decrypt(returnData.query[element])
            }
            if (returnData.update && returnData.update[element]) {
                returnData.update[element] = crypto.decrypt(returnData.update[element])
            }
        });
    }

    return returnData;
}
