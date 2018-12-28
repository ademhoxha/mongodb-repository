import { MongoPromiseRepositoryInterface } from '../mongoPromiseRepositoryInterface';
import { BaseMongoRepository } from './baseMongoRepository';

export class BaseMongoPromiseRepository implements MongoPromiseRepositoryInterface{

    private mongoRep: BaseMongoRepository;

    constructor(data: any) {
        this.mongoRep = new BaseMongoRepository(data);
    }

    loadModel(data: any): BaseMongoPromiseRepository {
        this.mongoRep.loadModel(data);
        return this;
    }

    closeSingletonConnection(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.mongoRep.closeSingletonConnection((err: any) => {
                if (err)
                    reject(err);
                else
                    resolve("Connection Closed");
            })
        });
    }

    insert(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.mongoRep.insert(data, (err: any, ret: any) => {
                if (err)
                    reject(err);
                else
                    resolve(ret);
            })
        });
    }

    find(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.mongoRep.find(data, (err: any, ret: any) => {
                if (err)
                    reject(err);
                else
                    resolve(ret);
            })
        });
    }

    remove(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.mongoRep.remove(data, (err: any, ret: any) => {
                if (err)
                    reject(err);
                else
                    resolve(ret);
            })
        });
    }

    update(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.mongoRep.update(data, (err: any, ret: any) => {
                if (err)
                    reject(err);
                else
                    resolve(ret);
            })
        });
    }
}