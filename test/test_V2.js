var repository = require('mongodb-repository-wmf').MongoRepository;
var BaseMongoPromiseRepository = repository.getBaseMongoPromiseRepository();
class PersonRepository extends BaseMongoPromiseRepository {
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
    /* other schemas*/
}
repository.setModel(model); // mongoose require the model loading

var person = {
    firstName : "Marcus",
    secondName : "Fenix"
}
 
var insertData = {
    query: person
}

var personRepository = new PersonRepository();
personRepository.find(insertData).then( ret => {console.log(ret)}).catch( err => {console.log(err)})