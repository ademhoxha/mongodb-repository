/** 
 * 
 * a local mongodb database must be launched at the ulr present in config.js file
 * 
 * test: for singleton repository all crud operations must be executed successfully and the connection must be closed successfully;
 * test: for prototype repository all crud operations must be executed successfully;
 * 
 */
var assert = require('assert');
const config = require('./config');
const OnTheFlyRepositoryFactory = require('../lib/index').OnTheFlyRepositoryFactory;

// test cases that must be passed before
require('./data.test');

OnTheFlyRepositoryFactory.loadModel(config.TestSchema1ModelLoading)

describe("CRUD operations tests", function () {
    this.timeout(20000);

    it("CRUD operations for a prototype repository", async function () {
        let ret;
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).insert(config.InsertQueryTestSchema1);
            assert.notEqual(ret,  null || undefined)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).find(config.FindQueryTestSchema1);
            assert.notEqual(ret,  null || undefined)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).update(config.UpdateQueryTestSchema1);
            assert.notEqual(ret,  null || undefined)
            assert.equal(ret.ok, 1)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).find(config.FindQueryTestSchema1);
            assert.notEqual(ret,  null || undefined)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).remove(config.RemoveQueryTestSchema1);
            assert.notEqual(ret,  null || undefined)
            assert.equal(ret.ok, 1)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).find(config.FindQueryTestSchema1);
            assert.notEqual(ret,  null || undefined)
        } catch (e) {
            err = e;
        } finally {
            assert.equal(err, null || undefined)
        }
    })

    it("CRUD operations for a singleton repository", async function () {
         let ret;
         let err;
         try {
             ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).insert(config.InsertQueryTestSchema1);
             assert.notEqual(ret,  null || undefined)
             ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).find(config.FindQueryTestSchema1);
             assert.notEqual(ret,  null || undefined)
             ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).update(config.UpdateQueryTestSchema1);
             assert.notEqual(ret,  null || undefined)
             assert.equal(ret.ok, 1)
             ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).find(config.FindQueryTestSchema1);
             assert.notEqual(ret,  null || undefined)
             ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).remove(config.RemoveQueryTestSchema1);
             assert.notEqual(ret,  null || undefined)
             assert.equal(ret.ok, 1)
             ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).find(config.FindQueryTestSchema1);
             assert.notEqual(ret,  null || undefined)
             ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).closeSingletonConnection();
         } catch (e) {
             err = e;
         } finally {
             assert.equal(err, null || undefined)
         }
     })

     it("CRUD operations Insert Many and Find All for a prototype repository", async function () {
        let ret;
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).insert([config.InsertQueryTestSchema1, config.InsertQueryTestSchema1Many1]);
            assert.notEqual(ret,  null || undefined)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).find({query : {}});
            assert.notEqual(ret,  null || undefined)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).remove(config.InsertQueryTestSchema1);
            assert.notEqual(ret,  null || undefined)
            assert.equal(ret.ok, 1)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).remove(config.InsertQueryTestSchema1Many1);
            assert.notEqual(ret,  null || undefined)
            assert.equal(ret.ok, 1)
        } catch (e) {
            err = e;
        } finally {
            assert.equal(err, null || undefined)
        }
    })

    it("CRUD operations Insert Many and Find All for a singleton repository", async function () {
        let ret;
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).insert([config.InsertQueryTestSchema1Many2, config.InsertQueryTestSchema1Many3]);
            assert.notEqual(ret,  null || undefined)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).find({query : {}});
            assert.notEqual(ret,  null || undefined)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).remove(config.InsertQueryTestSchema1Many2);
            assert.notEqual(ret,  null || undefined)
            assert.equal(ret.ok, 1)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).remove(config.InsertQueryTestSchema1Many3);
            assert.notEqual(ret,  null || undefined)
            assert.equal(ret.ok, 1)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).closeSingletonConnection();
        } catch (e) {
            err = e;
        } finally {
            assert.equal(err, null || undefined)
        }
    })

})