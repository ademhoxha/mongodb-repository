# Description

`mongodb-repository-wmf` is a simple but powerfull MongoDB repository inspired to `spring mongodb reactive repository` and based on `mongoose`. 
It provides a simple way to perfom all CRUD operations and an encryptyon utility to encrypt and decrypt data from and to DB. `mongodb-repository-wmf` let you escape from all mongo-db connections troubles (like new connection opening 
or connection closing) or mongoose schema-loading steps, without override nothing of `mongoose`. You can use all `mongoose` power but you don't have to concerne about opening and closing connection and model loading.
`You only have to specify the connection string and the schema name in a new class, and without any other line of code you will perform all the CRUD operations in a mongoose way`, and all the CRUD operation will be available 
for you.
You can change your schema and your db connection string in any time.
mongodb-repository-wmf provides two base classes:
1) BaseMongoRepository
2) SecretMongoRepository

### Simple Usage (No encryption) ==> BaseMongoRepository

First step you have to create the new repository (a class) that rappresent your schema and set two parameters, nothing more.
```javascript
var BaseMongoRepository = require('mongodb-repository-wmf').MongoRepository.getBaseMongoRepository();
class PersonRepository extends BaseMongoRepository {
    constructor() {
        var data = {}
        data.dbName = 'mongodb://localhost/test'; // use your connection string		
        data.schemaName = 'Person'; // schema Name
        super(data);
    }
}
```
**Note: you can send the dbName and the SchemaName in the constructor**

Define your model and initialize mongodb-repository-wmf:
```javascript
var repository = require('mongodb-repository-wmf').MongoRepository;
var model = {
	Person: {
		firstName : String,
		secondName: String,
		otherInfo : {}
	},
	/* other schemas*/
}
repository.setModel(model); // mongoose require the model loading
```


Insert a new Person in mongodb://localhost/test
```javascript
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
		// error
});
```

Update a Person
```javascript
var person = {
	firstName : "Marcus",
	secondName : "Fenix"
}
var updateData = {}
updateData.query = person;
updateData.update = {
	firstName: "Adam"
}

var personRepository = new PersonRepository();
personRepository.update( updateData, (err, ret) => {
	if(err)
		// error
	// all ok 
})
```

Delete a Person
```javascript
var person = {
	firstName : "Marcus",
	secondName : "Fenix"
}

var removeData = {}
removeData.query = person;

var personRepository = new PersonRepository();
personRepository.remove( removeData, (err, ret) => {
	if(err)
		// error
	// all ok 
})
```

Find a Person
```javascript
var person = {
	firstName : "Marcus",
	secondName : "Fenix"
}

var findData = {}
findData.query = person;

var personRepository = new PersonRepository();
personRepository.find( findData, (err, ret) => {
	if(err)
		// error
	// all ok 
})
```

Find all Persons
```javascript
var findAllData = { query: {} };
var personRepository = new PersonRepository();
personRepository.find( findAllData , (err, ret) => {
	if(err)
		// error
	// all ok 
})
```

**Please remind that err and ret variables are returned by mongoose.**

### Encrypted Usage (No encryption) ==> SecretMongoRepository

First step you have to create the new repository (a class) that rappresent your schema and set two parameters, nothing more.
```javascript
var SecretMongoRepository = require('mongodb-repository-wmf').MongoRepository.SecretMongoRepository();
class SecretPersonRepository extends SecretMongoRepository {
    constructor() {
        var data = {}
        data.dbName = 'mongodb://localhost/test'; // use your connection string		
        data.schemaName = 'SecretPerson'; // schema Name
		data.parameters = ["firstSecretInfo", "secondSecretInfo"]; // list of secret fields
        data.password = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" //your crypto key // if not present will be used 3zTvzr3p67VC61jmV54rIYu1545x4TlY
        super(data);
    }
}
```
Define your model and initialize mongodb-repository-wmf:
```javascript
var repository = require('mongodb-repository-wmf').MongoRepository;
var model = {
	SecretPerson: {
		firstName : String,
		secondName: String,
		firstSecretInfo : String,
		secondSecretInfo : String,
		otherInfo : {}
	},
	/* other schemas*/
}
repository.setModel(model); // mongoose require the model loading
```

You can perform all CRUD operation same as the previous example (BaseMongoRepository), but now in the DB you will have firstSecretInfo and secondSecretInfo encrypted.

**Please note that the encryption is valid only for first level fields and must be String type, no field in otherInfo can be encrypted!**