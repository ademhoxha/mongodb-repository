export class RepositoryError extends Error {
    constructor(name: string, message: string) {
        super(message);
        this.name = "WMF-MongoDbRepository - " + name;
    }

    static SingletonError: string = "SingletonError";
    static SchemaError: string = "SchemaError";
    static ConnectionError: string = "ConnectionError";
    static ObjectError: string = "ObjectError";
}

