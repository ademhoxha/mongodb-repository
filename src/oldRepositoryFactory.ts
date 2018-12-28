import { Model } from "./model/model";
import { BaseMongoRepository } from "./repositories/base/baseMongoRepository";
import { SecretMongoRepository } from "./repositories/secret/secretMongoRepository";
import { BaseMongoPromiseRepository } from "./repositories/base/baseMongoPromiseRepository";
import { SecretMongoPromiseRepository } from "./repositories/secret/secretMongoPromiseRepository";

/**
 * @deprecated since version 3.0
 */
export class OldRepositoryFactory {
    /**
     * @deprecated since version 3.0
    */
    setModel(schema: any) {
        Model.setModel(schema);
        return istance;
    }
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
    console.warn("Deprecationwarning: Please use the new On The Fly Repository Factory. This one will always work but not all the version 3.0 (or later) new features are guaranteed.");
}

export const istance = new OldRepositoryFactory();
