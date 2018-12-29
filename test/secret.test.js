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

OnTheFlyRepositoryFactory.loadModel(config.SecretSchemaModelLoading)

describe("Secret Repository tests", function () {
    this.timeout(20000);

    it("The crypted information must be encrypted in the reading part", async function () {
        let ret;
        let err;
        try {
            let secretValue = config.InsertQuerySecretSchema.query.secret;
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.ConfigSecretSchema).insert(config.InsertQuerySecretSchema);
            assert.notEqual(ret,  null || undefined)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.ConfigSecretSchema).find(config.FindQuerySecretSchema);
            assert.equal(ret[0].secret,secretValue)
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.ConfigSecretSchema).remove(config.FindQuerySecretSchema);
            assert.equal(ret.ok, 1)
        } catch (e) {
            err = e;
        } finally {
            assert.equal(err, null || undefined)
        }
    })

})