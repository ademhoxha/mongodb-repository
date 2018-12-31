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

describe("Secret Repository field tests", function () {
    this.timeout(20000);

    it("The Secret Repository must return an error for wrong type paraamters field (string)", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository({
                url: "url",
                schemaName: "secretSchema",
                singleton: false,
                secret: true,
                parameters: "secret"
            }).find(config.FindQuerySecretSchema);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("The Secret Repository must return an error for wrong type paraamters field (json) ", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository({
                url: "url",
                schemaName: "secretSchema",
                singleton: false,
                secret: true,
                parameters: {}
            }).find(config.FindQuerySecretSchema);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("The Secret Repository must return an error for wrong type paraamters field (type) ", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository({
                url: "url",
                schemaName: "secretSchema",
                singleton: false,
                secret: true,
                parameters: String
            }).find(config.FindQuerySecretSchema);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })


    it("The Secret Repository must return an error for wrong type paraamters field (array of int) ", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository({
                url: "url",
                schemaName: "secretSchema",
                singleton: false,
                secret: true,
                parameters: [1,2,3]
            }).find(config.FindQuerySecretSchema);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("The Secret Repository must return an error for spaces url", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository({
                url: "  ",
                schemaName: "secretSchema",
                singleton: false,
                secret: true,
                parameters: ["secret"]
            }).find(config.FindQuerySecretSchema);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("The Secret Repository must return an error for spaces schemaName", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository({
                url: "url",
                schemaName: "  ",
                singleton: false,
                secret: true,
                parameters: ["secret"]
            }).find(config.FindQuerySecretSchema);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("The Secret Repository must return an error for not loaded schema", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository({
                url: "url",
                schemaName: "XXXX",
                singleton: false,
                secret: true,
                parameters: ["secret"]
            }).find(config.FindQuerySecretSchema);
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("The Secret Repository must return an error for empty query parameter", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.ConfigSecretSchema).find({});
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("The Secret Repository must return an error for wrong query parameter", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.ConfigSecretSchema).find({ query : String});
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("The Secret Repository must return an error for empty update parameter in update operation", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.ConfigSecretSchema).update({ query : {}});
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

    it("The Secret Repository must return an error for wrong update parameter in update operation", async function () {
        let err;
        try {
            ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config.ConfigSecretSchema).update({ query : {}, update : String});
        } catch (e) {
            err = e;
        } finally {
            assert.notEqual(err, null || undefined)
        }
    })

})

describe("Secret Repository operation tests", function () {
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