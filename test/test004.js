/** 
 * How to execute two CRUD operations generating two Secret On The Fly Repositories without any code line break (just one continuous code line)
 * connection strategy : prototype
 * secret: true
 */

const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const personConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: false, // prototype connection strategy
    secret: true,
    parameters : ["secretInfo"],
}


OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).loadModel({
    Person: {
       firstName: String,
       secretInfo: String,
    }
}).insert({
    query: {
        firstName: "Secret",
        secretInfo: "Secret Information",
    }
}).then(r1 => {
    console.log("*************************** 11111111  **************************************");
    console.log(r1);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).insert({
        query: {
            firstName: "Secret",
            secretInfo: "Secret Information",
        }
    });
}).then(r2 => {
    console.log("*************************** 2222222  **************************************");
    console.log(r2);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).find({
        query: {
            firstName: "Secret",
        }
    });
}).then(r3 => {
    console.log("*************************** 3333  **************************************");
    console.log(r3);
}).catch(err => {
    console.log("**** error ****");
    console.log(err);
})