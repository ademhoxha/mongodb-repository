import { MongoPromiseRepositoryInterface } from './mongoPromiseRepositoryInterface';

export class MongoDBOnTheFlyRepository implements MongoPromiseRepositoryInterface{

    constructor(repository: MongoPromiseRepositoryInterface) {

        this.loadModel = (data) => repository.loadModel(data);
        this.closeSingletonConnection = () => repository.closeSingletonConnection();
        this.openSingletonConnection = () => repository.openSingletonConnection();

        this.insert = (data) => repository.insert(data);
        this.find = (data) => repository.find(data);
        this.update = (data) => repository.update(data);
        this.remove = (data) => repository.remove(data);

    }

    /**
     * @description: Load/Reload Model or Models.
     * @Param {Object}
     * @Return {MongoDBOnTheFlyRepository}
     */
    loadModel(data: any): MongoDBOnTheFlyRepository {
        return this
    }

    /**
     * @description: Open the singleton connection if it is not opened. 
     * Rejected if it is not a singleton connection strategy repository.
     * @Return {Promise}
     */
    openSingletonConnection(): Promise<any> {
        return new Promise((x,y) => { y("not implemented")});
    }

    /**
     * @description: Close the singleton connection if it is opened. 
     * Rejected if is not opened or is not a singleton connection.
     * @Return {Promise}
     */
    closeSingletonConnection(): Promise<any> {
        return new Promise((x,y) => { y("not implemented")});
    }

    /**
     * @description: Insert Operation.
     * @Param {Object} {query : { fields : values}}
     * @Return {Promise}
     */
    insert(data: any): Promise<any> {
        return new Promise((x,y) => { y("not implemented")});
    }

    /**
     * @description: Find Operation.
     * @Param {Object} {query : { fields : values}}
     * @Return {Promise}
     */
    find(data: any): Promise<any> {
        return new Promise((x,y) => { y("not implemented")});
    }

    /**
     * @description: Remove Operation.
     * @Param {Object} {query : { fields : values}}
     * @Return {Promise}
     */
    remove(data: any): Promise<any> {
        return new Promise((x,y) => { y("not implemented")});
    }

    /**
     * @description: Insert Operation.
     * @Param {Object} {query : { fields : values}, update : { fieldsToUpdate : values}}
     * @Return {Promise}
     */
    update(data: any): Promise<any> {
        return new Promise((x,y) => { y("not implemented")});
    }

}
