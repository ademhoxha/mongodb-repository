var repository = require('mongodb-repository-wmf').MongoRepository;

var BaseMongoRepository = repository.getBaseMongoRepository();
class PersonRepository extends BaseMongoRepository {
    constructor() {
        var data = {}
        data.dbName = 'mongodb://localhost/test'; // use your connection string		
        data.schemaName = 'Person'; // schema Name
        super(data);
    }
}

var model = {
    Person: {
        firstName : String,
        secondName: String,
        otherInfo : {}
    },
}
repository.setModel(model);


var person = {
    firstName : "Marcus",
    secondName : "Fenix"
}
 
var insertData = {
    query: person
}

var personRepository = new PersonRepository();
personRepository.insert(insertData, (err, ret) => {
    if(err)
       return console.log("error in insert")
    return findPerson();
});


function findPerson(){
    personRepository.find(insertData, (err, ret) => {
        if(err)
           return console.log("error in find")
        return console.log(ret);
    });
}