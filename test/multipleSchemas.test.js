/** 
 * 
 * a local mongodb database must be launched at the ulr present in config.js file
 * 
 * test: secret repository test;
 * 
 */
var assert = require('assert');
const config = require('./config');
const OnTheFlyRepositoryFactory = require('../lib/index').OnTheFlyRepositoryFactory;

// test cases that must be passed before
require('./advancedConnectionTest.test');

OnTheFlyRepositoryFactory.loadModel(config.TestSchema1ModelLoading)

describe("Multiple schemas tests", function () {
    this.timeout(20000);

    it("The crypted information must be encrypted in the reading part", async function () {
        let ret;
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.OkConfigPrototypeTestSchema1).find(config.FindQueryTestSchema1);
            assert.notEqual(ret,  null || undefined)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.ConfigSingletonTestSchema2)
            .loadModel(config.TestSchema2ModelLoading).find(config.FindQueryTestSchema2);
            assert.notEqual(ret,  null || undefined)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.ConfigSingletonTestSchema2).closeSingletonConnection();
        } catch (e) {
            err = e;
        } finally {
            assert.equal(err, null || undefined)
        }
    })

})