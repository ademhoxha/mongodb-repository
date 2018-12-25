/** 
 * How to execute two CRUD operations generating two On The Fly Repositories without code line break (just one continuous code line)
 * connection strategy : prototype
 */

const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const personConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: true // singleton connection strategy
}


OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).loadModel({
    Person: {
        firstName: String,
        secondName: String,
        otherInfo: {
            age: Number
        }
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
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).closeSingletonConnection(); // close singleton connection before model loading
}).then(r1 => {
    console.log("**** connection is closed ****");
    return OnTheFlyRepositoryFactory.loadModel({
        Person: {
            otherInfo: {
                age: Number
            }
        }
    }).generateOnTheFlyRepository(personConfig).find({ 
        query: {
            otherInfo: {
                age: 25
            }
        }
    });
}).then(r2 => {
    console.log("**** find is ok ****");
    console.log(r2);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).closeSingletonConnection();
}).then(r3 => {
    console.log("**** singleton connection is closed ****");
}).catch(err => {
    console.log("**** error ****");
    console.log(err);
})