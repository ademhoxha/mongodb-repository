/** 
 * How to execute two CRUD operations generating two On The Fly Repositories based on two different schema and with different connection
 * strategy without code line break (just one continuous code line)
 * connection strategy : prototype and singleton
 */

const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const personConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: true // singleton connection strategy
}

const animalConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Animal', // schema name
    singleton: false // prototype connection strategy
}


OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).loadModel({
    Person: {
        firstName: String,
        secondName: String,
    }
}).update({
    query: {
        firstName: "Cole",
        secondName: "Cole"
    },
    update: {
        firstName: "Cole",
        otherInfo: {
            age: 25
        }
    }
}).then(r1 => {
    console.log("**** update is ok ****");
    console.log(r1);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(animalConfig).loadModel({
        Animal: {
            name: String
        }
    }).find({
        query: {
            name: "Locust"
        }
    });
}).then(r2 => {
    console.log("**** find is ok ****");
    console.log(r2);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).closeSingletonConnection(); // close the singleton connection
}).then(r3 => {
    console.log("**** singleton connection is closed ****");
}).catch(err => {
    console.log("**** error ****");
    console.log(err);
})