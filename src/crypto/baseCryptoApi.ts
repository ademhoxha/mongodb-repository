export interface BaseCryptoApi {
    encrypt(text : string) : void;
    decrypt(encrypted : string) : void;
}
