/** 
 * 
 * a local mongodb database must be launched at the ulr present in config.js file
 * 
 * test: for singleton repository a wrong url must return an error;
 * test: for prototype repository a wrong url must return an error
 * test: prototype find operation on a correct url
 * test: singleton find operation and closing singleton connection on a correct url
 * 
 */
var assert = require('assert');
const config = require('./config');
const OnTheFlyRepositoryFactory = require('../lib/index').OnTheFlyRepositoryFactory;

OnTheFlyRepositoryFactory.loadModel(config.TestSchema1ModelLoading)

describe("Wrong Url tests", function () {

    it("Singleton Connection Strategy Repository must return an error for a wrong url", async function () {
        let ret;
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.FailConfigSingletonTestSchema1).find(config.FindQueryTestSchema1);
        } catch (e) {
            err = e;
        } finally {
            assert.equal(ret, undefined)
            assert.notEqual(err, null || undefined)
        }
    })

    it("Prototype Connection Strategy Repository must return an error for a wrong url", async function () {
        let ret;
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.FailConfigPrototypeTestSchema1).find(config.FindQueryTestSchema1);
        } catch (e) {
            err = e;
        } finally {
            assert.equal(ret, undefined)
            assert.notEqual(err, null || undefined)
        }
    })

})

describe("Correct Url doing a find operation tests", function () {

    it("Prototype Connection Strategy Repository must return a valid return object a correct url", async function () {
        let ret;
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).find(config.FindQueryTestSchema1);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(ret, undefined)
            assert.equal(err, null || undefined)
        }
    })

    it("Singleton Connection Strategy Repository must return a valid return object a correct url and the singleton connection must be closed successfuly", async function () {
        let ret;
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).find(config.FindQueryTestSchema1);
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).closeSingletonConnection();
        } catch (e) {
            err = e;
        } finally {
            assert.equal(err, null || undefined)
        }
    })

    it("Singleton Connection Strategy Repository must be closed without schemaName Parameter", async function () {
        let ret;
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).find(config.FindQueryTestSchema1);
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.ConfigSingletonNoSchemaName).closeSingletonConnection();
        } catch (e) {
            err = e;
        } finally {
            assert.equal(err, null || undefined)
        }
    })

    it("Singleton Connection Strategy Repository must return an error if no schemaName Parameter", async function () {
        let ret;
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.ConfigSingletonNoSchemaName).find(config.FindQueryTestSchema1);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

})

describe("Closing an Opening singleton connection tests", function () {

    it("Must be possible to open a singleton connection without schema name and close it without schema name for not secret repository", async function () {
        let ret;
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonOnlyUrl).openSingletonConnection();
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonOnlyUrl).closeSingletonConnection();
        } catch (e) {
            err = e;
        } finally {
            assert.equal(err, null || undefined)
        }
    })

    it("Must be possible to open a singleton connection without schema name and close it without schema name for secret repository", async function () {
        let ret;
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonOnlyUrlSecret).openSingletonConnection();
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonOnlyUrlSecret).closeSingletonConnection();
        } catch (e) {
            err = e;
        } finally {
            assert.equal(err, null || undefined)
        }
    })

    it("If a openSingletonConnection method is invoked for a prototype repository must return an error", async function () {
        let ret;
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).openSingletonConnection();
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("If a closingSingletonConnection method is invoked for a prototype repository must return an error", async function () {
        let ret;
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).find(config.FindQueryTestSchema1);
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).closeSingletonConnection();
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("If a closingSingletonConnection method is invoked for a singleton repository that has no singleton connection opened an error must be returned", async function () {
        let ret;
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigSingletonTestSchema1).closeSingletonConnection();
        } catch (e) {
            err = e;
        } finally {
            assert.equal(ret, undefined)
            assert.notEqual(err, null || undefined)
        }
    })

})
