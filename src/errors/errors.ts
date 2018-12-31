import { RepositoryError } from "./repositoryError";

export class ErrorFactory {
    static notSingletonIstance(): RepositoryError {
        return new RepositoryError(RepositoryError.SingletonError, "Trying to close the connection of a not Singleton Istance");
    }
    static notSingletonConnectionOpened(): RepositoryError {
        return new RepositoryError(RepositoryError.SingletonError, "Not Singleton Connection was opened");
    }
    static invalidSchema(): RepositoryError {
        return new RepositoryError(RepositoryError.SchemaError, "Invalid Schema Name, please make sure to pass a valid schemaName as argument.");
    }
    static invalidUrl(): RepositoryError {
        return new RepositoryError(RepositoryError.ConnectionError, "Invalid DataBase connection url, please make sure to pass a valid url as argument.");
    }
    static invalidCrudInsertManyParameter(): RepositoryError {
        return new RepositoryError(RepositoryError.ObjectError, "Invalid parameter for insert many, must be an Array of { query : { fields : values}} please pass a correct object to execute the operation.");
    }
    static invalidCrudQueryParameter(): RepositoryError {
        return new RepositoryError(RepositoryError.ObjectError, "Invalid <query> parameter, please pass a correct object to execute the operation.");
    }
    static invalidCrudUpdateParameter(): RepositoryError {
        return new RepositoryError(RepositoryError.ObjectError, "Invalid <update> parameter, please pass a correct object to execute the operation.");
    }
    static invalidCrudParameter(): RepositoryError {
        return new RepositoryError(RepositoryError.ObjectError, "Undefined object as parameter for the operation, please pass a valid object.");
    }
    static invalidSingletonConfigParameter(): RepositoryError {
        return new RepositoryError(RepositoryError.SingletonError, "The singleton parameter must be undefined or a boolean.");
    }
    static schemaNotLoaded(): RepositoryError {
        return new RepositoryError(RepositoryError.SchemaError, "Schema not loaded, please load it before using it.");
    }
    static cryptoParameterNotValid(): RepositoryError {
        return new RepositoryError(RepositoryError.ObjectError, "parameter is the secret repository must be an array of string.");
    }
}
