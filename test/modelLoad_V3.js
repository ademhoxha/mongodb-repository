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
    console.log(ret)

    repository.setModel({
        Locust: {
            name: String,
        }
    }).generateOnTheFlyRepository({
        url: 'mongodb://localhost/test',
        schemaName: 'Locust',
        singleton: true, // false is want to use a prototype connection
        //secret: true // if want to use secret
    }).find({
        query: {
            firstName: "Genral Raam",
        }
    }).then(ret => {
        console.log(ret)
    }).catch((err) => {
        console.log(err)
    })

}).catch((err) => {
    console.log(err)
})

