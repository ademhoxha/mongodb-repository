const url = 'mongodb://localhost/mongodb-repository-wmf-test'


const OnTheFlyRepositoryFactory = require('./lib/index').OnTheFlyRepositoryFactory;
var config = {
    url: url,
    schemaName: "TestSchema1",
    singleton: true,
    secret: true
}

var config2 = {
    url: url,
    singleton: true,
    secret: true
}

var schema = {
    TestSchema1: {
        testInfo1: String,
        testInfo2: String,
    }
}


async function f() {
    try {
        let x = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config2).openSingletonConnection();
        console.log("OK")
        setTimeout(async function () {
            let x = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config2).closeSingletonConnection();
            console.log("connection closed")
        }, 5000)
    } catch (e) {
        console.log(e)
    }
}


async function f1() {
    try {
        let x = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config2).openSingletonConnection();
        console.log("singleton connection opened")
        OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config2).loadModel(schema)
        console.log("schema loaded")
        x = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config).insert({
            query : {
                testInfo1 : "lol"
            }
        });
        console.log(x)
        x = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config).find({
            query : {
                testInfo1 : "lol"
            }
        });
        console.log(x)
        x = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config2).closeSingletonConnection();
        console.log("connection closed")
    } catch (e) {
        console.log(e)
    }
}

f1();