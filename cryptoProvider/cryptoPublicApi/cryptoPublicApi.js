var CTRCrypto = require('../sourceCode/CTRCrypto').CTRCrypto;

class cryptoFactory {

    getCTR(data){
        return new CTRCrypto(data);
    }
}

var istance = new cryptoFactory();

module.exports = {
    CTRCrypto : istance.getCTR
}