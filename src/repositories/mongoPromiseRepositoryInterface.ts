/**
 * @description: An on the fly repository interface
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
 */
export interface MongoPromiseRepositoryInterface {
    /**
     * @description: Load/Reload the model schemas (continuous loading).
     * 
     * Note: Before executing any CRUD operation for a specific schema its model 
     * 
     * must be loaded if it was not loaded before.
     * 
     * If you want to use another repository created on the fly with the same schemaName 
     * 
     * you do not have to load again the model
     * 
     * Example: 
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
     * 
     * @Param {Object} -- { schemaName : { fields: fields Type }}
     * @Return {OnTheFlyRepositoryFactory} -- return the factory
     */
    loadModel(data: any): MongoPromiseRepositoryInterface;

    /**
     * @description: Open the singleton connection if it is not opened. 
     * 
     * Alert: An Error will be launched if configured connection strategy is a prototype connection
     *  
     * @Return {Promise}
     */
    openSingletonConnection(): Promise<any>;

    /**
     * @description: Close the singleton connection if it is opened. 
     * 
     * Alert: An Error will be launched if the connection is not opened or is not a singleton
     *  
     * connection based repository.
     * @Return {Promise}
     */
    closeSingletonConnection(): Promise<any>;
    /**
     * @description: Insert Operation.
     * 
     * To perform an insert operation you must invoke the insert 
     * 
     * method passing a JSON Object with the 'query' field that specify the element to insert.
     * 
     * Example: 
     * 
     * {
     * 
     *     query: {
     * 
     *         firstName: "Adam",
     * 
     *         secondName: "Fenix",
     * 
     *         otherInfo: {
     * 
     *              age: 55
     * 
     *         } 
     * 
     *      }
     * 
     * }
     * @Param {Object} {query : { fields : values}}
     * 
     * @Return {Promise} -- if ok returns the inserted element, if error an Error Object will be returned
     * 
     * The 'ret' and the 'err' objects are the mongoose 'ret' and 'err' objects
     * 
     */
    insert(data: any): Promise<any>;
    /**
     * @description: Find Operation.
     * 
     * To perform a find operation you must invoke the find 
     * 
     * method passing a JSON Object with the 'query' field that specify the element to find
     * 
     * Example: 
     * 
     * {
     * 
     *     query: {
     * 
     *         firstName: "Adam",
     * 
     *         secondName: "Fenix",
     * 
     *         otherInfo: {
     * 
     *              age: 55
     * 
     *         } 
     * 
     *      }
     * 
     * }
     * 
     * Note: To do the Find All operation pass: { query : {} }
     * 
     * @Param {Object} {query : { fields : values}}
     * @Return {Promise} -- if ok returns the founded elements, if error an Error Object will be returned
     * 
     * The 'ret' and the 'err' objects are the mongoose 'ret' and 'err' objects     
     */
    find(data: any): Promise<any>;
    /**
     * @description: Remove Operation.
     * 
     * To perform a remove operation you must invoke the remove 
     * 
     * method passing a JSON Object with the 'query' field that specify the element to remove
     * 
     * Example: 
     * 
     * {
     * 
     *     query: {
     * 
     *         firstName: "Adam",
     * 
     *         secondName: "Fenix",
     * 
     *         otherInfo: {
     * 
     *              age: 55
     * 
     *         } 
     * 
     *      }
     * 
     * }
     * 
     * Note: Is a Remove All operation, all alements that match will be removed
     * @Param {Object} {query : { fields : values}}
     * @Return {Promise} -- if ok returns a json { n: 3, ok: 1 } where n is the number of removed element
     * 
     * and ok is 1 if all is gone well, if error an Error Object will be returned
     * 
     * The 'ret' and the 'err' objects are the mongoose 'ret' and 'err' objects     
     */
    remove(data: any): Promise<any>;
    /**
     * @description: Update Operation.
     * 
     * To perform an update operation you must invoke the update 
     * 
     * method passing a JSON Object with the 'query' field that specify the element to update 
     * 
     * and an 'update' object with the fields that must be apdated.
     * 
     * Example: 
     * 
     * {
     * 
     *     update: {
     * 
     *         firstName: "Adam",
     * 
     *      },
     * 
     *      query: {
     * 
     *         firstName: "Marcus",
     * 
     *         otherInfo: {
     * 
     *              age: 35
     * 
     *         } 
     * 
     *      }
     * 
     * }
     * 
     * Note: Is a Update All operation, all alements that match will be updated
     * @Param {Object} {query : { fields : values}, update : { fieldsToUpdate : values}}
     * @Return {Promise} -- if ok returns { n: 3, nModified: 2, ok: 1 } where is the found element
     * 
     * nModified the number of modified elements and ok is 1 if all is gone well, if error an Error Object will be returned
     * 
     * The 'ret' and the 'err' objects are the mongoose 'ret' and 'err' objects   
     */
    update(data: any): Promise<any>;
}