import * as mongoCRUD from './mongoCRUD';
import * as mongooseProxyInterface from '../proxy/mongooseProxyInterface';

export class MongoCrudOperations {

    private dbName: string;
    private schemaName: string;
    private mongooseProxy: mongooseProxyInterface.MongooseProxyInterface;
    private mongoOperation: mongoCRUD.MongoCRUD;

    constructor(data: any, mongooseProxy: mongooseProxyInterface.MongooseProxyInterface) {
        // db and schema information
        this.dbName = data.dbName;
        this.schemaName = data.schemaName;
        // mongoose istance
        this.mongooseProxy = mongooseProxy;
        // new CRUD operation
        this.mongoOperation = new mongoCRUD.MongoCRUD({
            'mongooseProxy': mongooseProxy,
            'singleton': data.singleton
        });
    }

    find(userData: any, callback: (err: any, ret: any) => void) {
        var data = this.completeData(userData);
        this.mongoOperation.find(data, callback);
    }

    update(userData: any, callback: (err: any, ret: any) => void) {
        var data = this.completeData(userData);
        this.mongoOperation.update(data, callback);
    }

    remove(userData: any, callback: (err: any, ret: any) => void) {
        var data = this.completeData(userData);
        this.mongoOperation.remove(data, callback);
    }

    insert(userData: any, callback: (err: any, ret: any) => void) {
        var data = this.completeData(userData);
        this.mongoOperation.insert(data, callback);
    }

    closeSingletonConnection(callback: (err: any, ret: any) => void) {
        var data = this.completeData({});
        this.mongoOperation.execClose(data, callback);
    }

    completeData(userData: any) {
        var data = userData;
        data.mongooseProxy = this.mongooseProxy;
        data.schemaName = this.schemaName;
        data.dbName = this.dbName;
        return data;
    }

}