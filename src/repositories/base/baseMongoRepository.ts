import { MongoCrudOperations } from "../../crud/mongoCrudOperations";
import { ErrorFactory } from "../../errors/errors";
import { MongooseProxyFactory } from "../../proxy/mongooseProxyFactory";
import { Model } from "../../model/model";
import { RepositoryUtils } from "../../utils/repositoryUtils";

export class BaseMongoRepository {

    private mongo: any;
    private mongoCrud: MongoCrudOperations = MongoCrudOperations.prototype; // can't be null
    private dbName: string;
    private schemaName: string;
    private singleton: boolean;
    private isInitialized: boolean;

    constructor(data: any) {
        if (!data)
            data = {};
        this.mongo = null;
        //this.mongoCrud = null;
        this.dbName = data.dbName;
        if (data.url)
            this.dbName = data.url;
        this.schemaName = data.schemaName;
        this.singleton = data.singleton;
        this.isInitialized = false;
    }

    checkQueryParameters(data: any, update: boolean, insert: boolean): any {
        if (insert && data && data instanceof Array) { // insert many
            if (!RepositoryUtils.isValidInsertManyObject(data))
                return ErrorFactory.invalidCrudInsertManyParameter();
        }
        else {
            if (!RepositoryUtils.isValidQueryUpdateObject(data))
                return ErrorFactory.invalidCrudParameter();
            if (!RepositoryUtils.isValidQueryUpdateObject(data.query))
                return ErrorFactory.invalidCrudQueryParameter();
            if (update && !RepositoryUtils.isValidQueryUpdateObject(data.update))
                return ErrorFactory.invalidCrudUpdateParameter();
        }
        return undefined;
    }

    checkRepositoryParameters(checkIfSchemaLoaded: boolean): any {
        if (!RepositoryUtils.isValidRepositoryConfigString(this.dbName))
            return ErrorFactory.invalidUrl();
        if (checkIfSchemaLoaded && !RepositoryUtils.isValidRepositoryConfigString(this.schemaName))
            return ErrorFactory.invalidSchema();
        if (checkIfSchemaLoaded && !Model.getSchemaJson(this.schemaName))
            return ErrorFactory.schemaNotLoaded();
        if (!RepositoryUtils.isValidSingletonConfigParameter(this.singleton))
            return ErrorFactory.invalidSingletonConfigParameter();
        return undefined;
    }

    loadModel(data: any): BaseMongoRepository {
        Model.setModel(data);
        return this;
    }

    closeSingletonConnection(callback: (err: any) => void) {
        let cp = this.checkRepositoryParameters(false);
        if (cp)
            return callback(cp);

        if (!this.singleton)
            return callback(ErrorFactory.notSingletonIstance())

        if (!this.isInitialized) {
            var data: any = {};
            data.dbName = this.dbName;
            data.schemaName = this.schemaName;
            data.singleton = this.singleton;
            let MongooseProxy = MongooseProxyFactory.generateProxy(this.singleton);
            this.mongo = new MongooseProxy(data);
            if (!this.mongo.getConnection() || this.mongo.getConnection() == null)
                return callback(ErrorFactory.notSingletonConnectionOpened());
        }

        this.mongoCrud = new MongoCrudOperations(data, this.mongo);
        return this.mongoCrud.closeSingletonConnection((err: any) => {
            if (err)
                return callback(err);
            this.mongo.connectionClosed();
            return callback(undefined)
        });
    }

    initialize(callback: (err: any) => void) {
        var data: any = {};
        data.dbName = this.dbName;
        data.schemaName = this.schemaName;
        data.singleton = this.singleton;
        let MongooseProxy = MongooseProxyFactory.generateProxy(this.singleton);
        this.mongo = new MongooseProxy(data);
        return this.mongo.openConnection((err: any) => {
            if (err)
                return callback(err);
            this.mongoCrud = new MongoCrudOperations(data, this.mongo);
            this.isInitialized = true;
            return callback(undefined);
        });
    }

    insert(data: any, callback: (err: any, ret: any) => void) {
        let cp = this.checkRepositoryParameters(true);
        if (cp)
            return callback(cp, undefined);

        cp = this.checkQueryParameters(data, false, true);
        if (cp)
            return callback(cp, undefined);

        if (!this.singleton || !this.isInitialized)
            return this.initialize((err: any) => {
                if (err)
                    return callback(err, undefined)
                this.mongoCrud.insert(data, callback);
            });

        this.mongoCrud.insert(data, callback);
    }

    find(data: any, callback: (err: any, ret: any) => void) {
        let cp = this.checkRepositoryParameters(true);
        if (cp)
            return callback(cp, undefined);
        cp = this.checkQueryParameters(data, false, false);
        if (cp)
            return callback(cp, undefined);

        if (!this.singleton || !this.isInitialized)
            return this.initialize((err: any) => {
                if (err)
                    return callback(err, undefined)
                this.mongoCrud.find(data, callback);
            });

        this.mongoCrud.find(data, callback);
    }

    remove(data: any, callback: (err: any, ret: any) => void) {
        let cp = this.checkRepositoryParameters(true);
        if (cp)
            return callback(cp, undefined);
        cp = this.checkQueryParameters(data, false, false);
        if (cp)
            return callback(cp, undefined);

        if (!this.singleton || !this.isInitialized)
            return this.initialize((err: any) => {
                if (err)
                    return callback(err, undefined)
                this.mongoCrud.remove(data, callback);
            });

        this.mongoCrud.remove(data, callback);
    }

    update(data: any, callback: (err: any, ret: any) => void) {
        let cp = this.checkRepositoryParameters(true);
        if (cp)
            return callback(cp, undefined);
        cp = this.checkQueryParameters(data, true, false);
        if (cp)
            return callback(cp, undefined);

        if (!this.singleton || !this.isInitialized)
            return this.initialize((err: any) => {
                if (err)
                    return callback(err, undefined)
                this.mongoCrud.update(data, callback);
            });

        this.mongoCrud.update(data, callback);
    }

}
