var repository = require('mongodb-repository-wmf').MongoRepository;

repository.generateOnTheFlyRepository({
    url: 'mongodb://localhost/test',
    schemaName: 'Person',
    singleton: true, // false is want to use a prototype connection
    //secret: true // if want to use secret
}).setModel({
    Person: {
        firstName: String,
        secondName: String,
        otherInfo: {}
    }
}).find({
    query: {
        firstName: "Adam",
        secondName: "Fenix"
    }
}).then(ret => {
    // now close the singleton connection
    console.log(ret)
    repository.generateOnTheFlyRepository({
        url: 'mongodb://localhost/test',
        schemaName: 'Person',
        singleton: true, // false is want to use a prototype connection
        //secret: true // if want to use secret
    }).closeSingletonConnection().then(x => {
        console.log("connection closed");
    }).catch(e => {
        console.log("error in closing connection")
        console.log(e)
    })
}).catch((err) => {
    console.log(err)
})