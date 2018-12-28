import { MongoPromiseRepositoryInterface } from '../mongoPromiseRepositoryInterface';
import { SecretMongoRepository } from './secretMongoRepository';


export class SecretMongoPromiseRepository implements MongoPromiseRepositoryInterface{

    private mongoRep: SecretMongoRepository;

    constructor(data: any) {
        this.mongoRep = new SecretMongoRepository(data);
    }

    loadModel(data: any): SecretMongoPromiseRepository {
        this.mongoRep.loadModel(data);
        return this;
    }

    closeSingletonConnection(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.mongoRep.closeSingletonConnection((err: any) => {
                if (err)
                    reject(err);
                else
                    resolve("connection closed");
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