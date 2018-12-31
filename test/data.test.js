/** 
 * 
 * a local mongodb database must be launched at the ulr present in config.js file
 * 
 * test: test all config data for the repository and all data for crud operations 
 * 
 */
var assert = require('assert');
const config = require('./config');
const OnTheFlyRepositoryFactory = require('../lib/index').OnTheFlyRepositoryFactory;

// test cases that must be passed before
require('./connection.test');

OnTheFlyRepositoryFactory.loadModel(config.TestSchema1ModelLoading)

describe("Invalid Data Tests", function () {

    it("An Error must be returned for undefined configuration repository", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository().find(config.FindQueryTestSchema1);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for null configuration repository", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(null).find(config.FindQueryTestSchema1);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for empty configuration repository", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository({}).find(config.FindQueryTestSchema1);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })


    it("An Error must be returned for url null", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository({
                url: null
            }).find(config.FindQueryTestSchema1);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for url different by string type", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository({
                url: 3
            }).find(config.FindQueryTestSchema1);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for url empty or spaces", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository({
                url: "    "
            }).find(config.FindQueryTestSchema1);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for schemaName undefined", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository({
                url: "url"
            }).find(config.FindQueryTestSchema1);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for schemaName null", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository({
                url: "url",
                schemaName: null
            }).find(config.FindQueryTestSchema1);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for schemaName different by string type", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository({
                url: "url",
                schemaName: 3
            }).find(config.FindQueryTestSchema1);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for schemaName empty or spaces", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository({
                url: "url",
                schemaName: "    "
            }).find(config.FindQueryTestSchema1);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for for schemaName not loaded", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository({
                url: "url",
                schemaName: "XXXXXXX"
            }).find();
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for CRUD operation with undefined json object", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).find();
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for CRUD operation with null json object", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).find(null);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for CRUD operation with empty json object", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).find({});
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for CRUD operation with wrong query object (string)", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).find({
                query: "query"
            });
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for CRUD operation with wrong query object (String type) ", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).find({
                query: String
            });
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for UPDATE CRUD operation with undefined update object", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).update({
                query: {}
            });
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for INSERT ALL CRUD operation with empty vector", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).insert([]);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for INSERT ALL CRUD operation with a vector with an empty element", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).insert([{}]);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for INSERT ALL CRUD operation with a vector with a wrong element (query param)", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).insert([{
                query : String
            }]);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for INSERT ALL CRUD operation with a vector with one empty element and a correct one", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).insert([{
            }, { query : { a : "test"} }]);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("An Error must be returned for INSERT ALL CRUD operation with a vector with one wrong element (query param) and a correct one", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).insert([{
                query : String
            },  { query : { a : "test"} }]);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

})



