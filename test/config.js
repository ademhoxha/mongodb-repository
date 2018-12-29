/** 
 * 
 * configuration file for mocha tests
 * 
 */
const url = 'mongodb://localhost/mongodb-repository-wmf-test'
const wrong_url = '***********'
const testSchema1 = 'TestSchema1';
const testSchema2 = 'TestSchema2';
const secretSchema = 'SecretSchema';

const configSingletonTestSchema2 = {
    url: url,
    schemaName: testSchema2,
    singleton: true
}
const configSecretSchema = {
    url: url,
    schemaName: secretSchema,
    singleton: false,
    secret: true,
    parameters: ["secret"]
}
const okConfigSingletonTestSchema1 = {
    url: url,
    schemaName: testSchema1,
    singleton: true
}
const okConfigPrototypeTestSchema1 = {
    url: url,
    schemaName: testSchema1,
    singleton: false
}
const failConfigSingletonTestSchema1 = {
    url: wrong_url,
    schemaName: testSchema1,
    singleton: true
}
const failConfigPrototypeTestSchema1 = {
    url: wrong_url,
    schemaName: testSchema1,
    singleton: false
}
const testSchema1ModelLoading = {
    TestSchema1: {
        testInfo1: String,
        testInfo2: String,
    }
}
const testSchema2ModelLoading = {
    TestSchema2: {
        schema2info: String
    }
}
const secretSchemaModelLoading = {
    SecretSchema: {
        secret: String
    }
}
const findQueryTestSchema2 = {
    query: {
        schema2info: "Schema2",
    }
}
const findQuerySecretSchema = {
    query: {
        secret: "Element",
    }
}
const insertQuerySecretSchema = {
    query: {
        secret: "Element",
    }
}
const findQueryTestSchema1 = {
    query: {
        testInfo1: "Element",
    }
}
const insertQueryTestSchema1 = {
    query: {
        testInfo1: "Element",
    }
}
const updateQueryTestSchema1 = {
    query: {
        testInfo1: "Element",
    },
    update: {
        testInfo2: "Updated",
    }
}
const removeQueryTestSchema1 = {
    query: {
        testInfo1: "Element",
    }
}

module.exports = {
    OkConfigSingletonTestSchema1: okConfigSingletonTestSchema1,
    OkConfigPrototypeTestSchema1: okConfigPrototypeTestSchema1,
    FailConfigSingletonTestSchema1: failConfigSingletonTestSchema1,
    FailConfigPrototypeTestSchema1: failConfigPrototypeTestSchema1,
    TestSchema1ModelLoading: testSchema1ModelLoading,
    FindQueryTestSchema1: findQueryTestSchema1,
    InsertQueryTestSchema1: insertQueryTestSchema1,
    UpdateQueryTestSchema1: updateQueryTestSchema1,
    RemoveQueryTestSchema1: removeQueryTestSchema1,
    ConfigSecretSchema: configSecretSchema,
    SecretSchemaModelLoading: secretSchemaModelLoading,
    FindQuerySecretSchema: findQuerySecretSchema,
    InsertQuerySecretSchema: insertQuerySecretSchema,
    ConfigSingletonTestSchema2: configSingletonTestSchema2,
    TestSchema2ModelLoading: testSchema2ModelLoading,
    FindQueryTestSchema2: findQueryTestSchema2
}