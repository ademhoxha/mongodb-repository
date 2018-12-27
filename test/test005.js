/** 
 * How to execute multiple CRUD operations on different connection strategies and closing twice a singleton connection without any code line break (just one continuous code line)
 * connection strategy : prototype, singleton
 */

const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const singletonConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: true, // singleton connection strategy
}

const prototypeConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: false, // prototype connection strategy
}


OnTheFlyRepositoryFactory.loadModel({
    Person: {
       firstName: String,
    }
})

OnTheFlyRepositoryFactory.generateOnTheFlyRepository(singletonConfig).find({
    query: {
        firstName: "Cole",
    }
}).then(r1 => {
    console.log("*************************** 1 find singleton  **************************************");
    console.log(r1);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(singletonConfig).find({
        query: {
            firstName: "Cole",
        }
    });
}).then(r2 => {
    console.log("*************************** 2 find singleton   **************************************");
    console.log(r2);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(prototypeConfig).find({
        query: {
            firstName: "Cole",
        }
    });
}).then(r3 => {
    console.log("*************************** 1 find prototype   **************************************");
    console.log(r3);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(singletonConfig).closeSingletonConnection();
}).then(r4 => {
    console.log("*************************** singleton closed  **************************************");
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(prototypeConfig).find({
        query: {
            firstName: "Cole",
        }
    });
}).then(r4 => {
    console.log("***************************  2 find prototype **************************************");
    console.log(r4);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(singletonConfig).find({
        query: {
            firstName: "Cole",
        }
    });
}).then(r5 => {
    console.log("*************************** 3 find singleton   **************************************");
    console.log(r5);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(singletonConfig).closeSingletonConnection();
}).then(r6 => {
    console.log("*************************** singleton closed  **************************************");
}).catch(err => {
    console.log("**** error ****");
    console.log(err);
})