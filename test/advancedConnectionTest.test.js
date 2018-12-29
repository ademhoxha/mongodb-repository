/** 
 * 
 * a local mongodb database must be launched at the ulr present in config.js file
 * 
 * test: execute CRUD operations with different connection strategy.;
 * 
 */
var assert = require('assert');
const config = require('./config');
const OnTheFlyRepositoryFactory = require('../lib/index').OnTheFlyRepositoryFactory;

// test cases that must be passed before
require('./crudOperations.test');


OnTheFlyRepositoryFactory.loadModel(config.TestSchema1ModelLoading)

describe("Advanced Connection tests", function () {
    this.timeout(20000);

    it("CRUD operations with singleton (opened and closed 2 times) and prototype repository", async function () {
        let ret;
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).insert(config.InsertQueryTestSchema1);
            assert.notEqual(ret,  null || undefined)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).find(config.FindQueryTestSchema1);
            assert.notEqual(ret,  null || undefined)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).update(config.UpdateQueryTestSchema1);
            assert.notEqual(ret,  null || undefined)
            assert.equal(ret.ok, 1)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).closeSingletonConnection();
            assert.notEqual(ret,  null || undefined)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).find(config.FindQueryTestSchema1);
            assert.notEqual(ret,  null || undefined)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).remove(config.RemoveQueryTestSchema1);
            assert.notEqual(ret,  null || undefined)
            assert.equal(ret.ok, 1)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).find(config.FindQueryTestSchema1);
            assert.notEqual(ret,  null || undefined)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).closeSingletonConnection();
        } catch (e) {
            err = e;
        } finally {
            assert.equal(err, null || undefined)
        }
    })

})