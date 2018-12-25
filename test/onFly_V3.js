var repository = require('mongodb-repository-wmf').MongoRepository;

repository.generateOnTheFlyRepository({
    url: 'mongodb://localhost/test',
    schemaName: 'Person',
    singleton: false, // false is want to use a prototype connection, true for singleton connection
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
    console.log(ret);
}).catch((err) => {
    console.log(err);
})