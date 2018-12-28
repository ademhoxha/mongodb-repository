import { BaseCryptoApi } from "../baseCryptoApi";
import * as crypto from 'crypto';

export class CTRCrypto implements BaseCryptoApi {

    private cryptoData : any = {};
    constructor(data : any) {
        this.cryptoData.algorithm = 'aes-256-ctr';
        if (data.password)
            this.cryptoData.password = data.password;
        else
            this.cryptoData.password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY';  // Base Config
    }

    encrypt(text : string) {
        var cipher = crypto.createCipher(this.cryptoData.algorithm, this.cryptoData.password)
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    }

    decrypt(encrypted : string) {
        var decipher = crypto.createDecipher(this.cryptoData.algorithm, this.cryptoData.password)
        var dec = decipher.update(encrypted, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec;
    }
}