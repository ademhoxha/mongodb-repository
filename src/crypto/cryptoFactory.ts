import { BaseCryptoApi } from "./baseCryptoApi";
import { CTRCrypto } from "./ctr/CTRCrypto";

class Factory {

    getCTRCrypto(data : any) : BaseCryptoApi{
        return new CTRCrypto(data);
    }
}

export const CryptoFactory = new Factory();
