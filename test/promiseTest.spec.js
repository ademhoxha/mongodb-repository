var repository = require('mongodb-repository-wmf').MongoRepository;

var GetBaseMongoPromiseRepository = repository.getBaseMongoPromiseRepository();
class PersonRepository extends GetBaseMongoPromiseRepository {
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
personRepository.insert(insertData).then( (ret) => {console.log(ret)}).catch( (err) => {console.log(err)});