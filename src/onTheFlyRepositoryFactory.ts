import { MongoPromiseRepositoryInterface } from './repositories/mongoPromiseRepositoryInterface';
import { Model } from './model/model';
import { MongoDBOnTheFlyRepository } from './repositories/mongoDBOnTheFlyRepository';
import { SecretMongoPromiseRepository } from './repositories/secret/secretMongoPromiseRepository';
import { BaseMongoPromiseRepository } from './repositories/base/baseMongoPromiseRepository';

/**
 * @description: Used to generate repositories on the fly.
 * 
 * The implementation of the repository will be created only after a CRUD operation call
 * 
 * All the singleton connection strategy based repositories that points to the same url
 * will share the same connection
 * 
 * Every prototype singleton connection strategy based repository will open and close 
 * its own connection
 * 
 * For singleton connection strategy based repository the reloading of the model will 
 * have no effect untill the connection will be closed by calling closeSingletonConnection()
 * and reopened by a new singleton repository generation.
 * 
 */
export class OnTheFlyRepositoryFactory {
    /**
     * @description: Used to generate repositories on the fly.
     * 
     * The implementation of the repository will be created only after a CRUD operation call
     * 
     * All the singleton connection strategy based repositories that points to the same url
     * will share the same connection
     * 
     * Every prototype singleton connection strategy based repository will open and close 
     * its own connection
     * 
     * For singleton connection strategy based repository the reloading of the model will 
     * have no effect untill the connection will be closed by calling closeSingletonConnection()
     * 
     * and reopened by a new singleton repository generation.
     * 
     * Example:
     * 
     *   const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;
     * 
     *    const personConfig = {
     *        url: 'mongodb://localhost/test', // user your connection string
     *        schemaName: 'Person', // schema name
     *        singleton: false // prototype connection strategy
     *    }
     * 
     *    OnTheFlyRepositoryFactory.loadModel({
     *        Person: {
     *            firstName: String,
     *            secondName: String,
     *        }
     *    })
     * 
     *    OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).update({ 
     *        query: { // element to find
     *            firstName: "Adam"
     *        }
     *        update : { // fields to be updated
     *            firstName: "Marcus"
     *        }
     *    }).then(ret => {
     *        console.log(ret)
     *    }).catch((err) => {
     *        console.log(err)
     *    })
     * 
     */
    generateOnTheFlyRepository(data: any): MongoPromiseRepositoryInterface {
        if (data.secret)
            return new MongoDBOnTheFlyRepository(new SecretMongoPromiseRepository(data));
        return new MongoDBOnTheFlyRepository(new BaseMongoPromiseRepository(data));
    }
    /**
     * @description: Load/Reload the model schemas (continuous loading).
     * 
     * Note: Before executing any CRUD operation for a specific schema its model 
     * must be loaded if it was not loaded before.
     * 
     * If you want to use another repository created on the fly with the same schemaName 
     * you do not have to load again the model
     * 
     * Example: 
     * 
     * {
     * 
     *     Person: {
     * 
     *         firstName: String,
     * 
     *         secondName: String,
     * 
     *         otherInfo: {
     * 
     *              age: Number
     * 
     *         } 
     * 
     *      },
     * 
     *      // other schemas if desired
     * 
     * }
     * @Param {Object} -- { schemaName : { fields: fields Type }}
     * @Return {OnTheFlyRepositoryFactory} -- return the factory
     */
    loadModel(schema: any): OnTheFlyRepositoryFactory {
        Model.setModel(schema);
        return istance;
    }
}
export const istance = new OnTheFlyRepositoryFactory();