/** 
 * How to execute two CRUD operations generating two On The Fly Repositories and close the singleton connection without code line break (just one continuous code line)
 * connection strategy : singleton
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
        otherInfo: {}
    }
}).update({
    query: {
        firstName: "Cole",
        secondName: "Cole"
    },
    update: {
        firstName: "Cole"
    }
}).then(r1 => {
    console.log("**** update is ok ****");
    console.log(r1);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).find({
        query: {
            firstName: "Cole"
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