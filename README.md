# mongodb-repository-wmf

*A Javascript One Code Line On The Fly MongoDb Repository*.

Use a fast and easy JavaScript On The Fly MongoDb Repository inspired to `Java Spring 5 MongoDb Reactive Repository`. 
`You don’t have to write an implementation of the repository` you have just to use it.
You will be able to choose the connection strategy (singleton or prototype) and to `perform a CRUD operation in only one line of code`. No need to care about the repository implementation or to open or close the connection.
Based on `mongoose` mongodb-repository-wmf is written in an object oriented way combined with the promise approach, this permitts to do all in one not interrupted code line.
An On The Fly Repository able to encrypt and decrypt data from and to DB is also provided by mongodb-repository-wmf.
## Importing
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;
```
## Installation
After the installation of [node.js](http://nodejs.org/) you must install [mongodb](https://www.mongodb.org/downloads) or use a database provider as [mLab](https://mlab.com/) . Then:

```sh
$ npm i mongodb-repository-wmf
$ npm i mongoose
$ npm i crypto
```
## Contributors
If you want to join me please send me an email: `adem.hoxha@hotmail.it`.
## Take a Look
Let see how to perform an insert operation in a not interruped line of code (just well formatted):
```javascript
require('mongodb-repository-wmf').MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test', // use your connection string
    schemaName: 'Person',
    singleton: false // set to true if want to use a singleton connection strategy
}).setModel({ // must loaded only for the first On The Fly Repository
    Person: {
        firstName: String,
        secondName: String,
    }
}).insert({
    query: {
        firstName: "Adam",
        secondName: "Fenix"
    }
}).then(ret => {
    console.log(ret)
}).catch((err) => {
    console.log(err)
})
```
The model loading is requested by `mongoose`, you have to do it just once for each schema. The repository will be created only when the operation insert is called.
You do not have to care about the connection opening or the connection closing or the other mongoose issues, you must just specify the db url, the schema name and the schema model to be able to perform all the CRUD operations. In this case a prototype connection strategy was used.
For more complete examples please see the [Examples](#Examples) section and the [Performances and Best Practies](#Performances and Best Practies) section for the best usage approach.
## Overview of the version 3
The On The Fly Repository is added in the version 3 of `mongodb-repository-wmf` and it is the only Repository type that will be updated in the future. Version 2 or Version 1 features will still works because the `backward compatibility is guaranteed`.
### Configure the On The Fly Repository
To configure the On The Fly Repository you must invoke the generate method with a configuration JSON Object.
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

var onFlyRep = MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person',
    singleton: true, // a singleton connection strategy will be used
    secret: false // it is not a Repository with encryption capability
})
```
Choosing `singleton: true` a singleton connection strategy repository will be generated for that specified `url`. Note if you will try to generate another singleton connection strategy repository for the same `url` it will use the same connection. To generate a new singleton connection you must before close the singleton connection.

```javascript
MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person',
    singleton: true, // a singleton connection strategy will be used
}).closeSingletonConnection().then(ret => {
    console.log("connection successfully closed");
}).catch(e => {
     console.log(e)
})
```
Choosing `singleton: false` or not putting it at all you will have a prototype connection strategy repository, so you will have a new connection for each On The Fly Repositories and the connection will be open when a CRUD operation is invoked on that repository and will be closed when the CRUD operation will end.
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

var onFlyRep = MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person',
    singleton: false, // a prototype connection strategy will be used
})
// at this point no connection is created
onFlyRep.setModel({
    Person: {
        firstName: String,
        secondName: String,
    }
})
// at this point no connection is created too
onFlyRep.insert({  // there a connection is created
    query: {
        firstName: "Adam",
        secondName: "Fenix"
    }
}).then(ret => { // there the created connection is closed
    console.log(ret)
}).catch((err) => {
    console.log(err)
})
```
### Model Loading
Before executing any CRUD operation a model must be loaded (do it just once) if it was not loaded before.
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

var onFlyRep = MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person'
    // a prototype connection strategy will be used
}).setModel({
    Person: {
        firstName: String,
        secondName: String,
    }
})
```
You must load just the needed schema (Person in this case).
It is possible to load the model before the repository configuration
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

var onFlyRep = MongoRepository.setModel({
    Person: {
        firstName: String,
        secondName: String,
    }
}).generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person'
    // a prototype connection strategy will be used
})
```
This is possible because the connection creation happens only when the CRUD operation is invoked.
If you want to generate another On The Fly Repository with the same schemaName you do not have to load again the model. You must do it only if you want to ovverride that model or want to add a new one.

```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

var personRep = MongoRepository.setModel({
    Person: {
        firstName: String,
        secondName: String,
    }
}).generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person'
    // a prototype connection strategy will be used
})

var newPersonRep = MongoRepository.generateOnTheFlyRepository({  // no model loading is required (you done it before)
    url: 'mongodb://localhost/test',
    schemaName: 'Person'
    // a prototype connection strategy will be used
})

var animalRep = MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Animal'
    // a prototype connection strategy will be used
}).setModel({ // here you must load Animal for the first time
    Animal: {
        name: String,
    }
})

var newPersonRep2 = MongoRepository.generateOnTheFlyRepository({  // no model loading is required (you done it before)
    url: 'mongodb://localhost/test',
    schemaName: 'Person'
    // a prototype connection strategy will be used
})

var animalRep = MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Animal'
    // a prototype connection strategy will be used
}).setModel({ // here you must load Animal again because you changed the schema (sex is added now)
    Animal: {
        name: String,
        sex: String // added field in the schema
    }
})
```
So, each model must be loaded once and can be overwritten by loading it again.
### CRUD Operation
Careless the connection strategy of the Repository you can perform:
1) insert
2) find (find all)
3) remove
4) update
##### Insert
To perform an insert operation you must invoke the insert method passing a JSON Object with the query field that specify the element to insert.
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

var personRep = MongoRepository.setModel({
    Person: {
        firstName: String,
        secondName: String,
    }
}).generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person'
    // a prototype connection strategy will be used
}).insert({ 
    query: {
        firstName: "Adam",
        secondName: "Fenix"
    }
}).then(ret => {
    console.log(ret)
}).catch((err) => {
    console.log(err)
})
```
This code will insert a new Person with `firstName: "Adam"` and `secondName: "Fenix"`. The `query` object can use all the `mongoose` power for more complicated structures.
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

var personRep = MongoRepository.setModel({
    Person: {
        firstName: String,
        secondName: String,
        otherInfo: {
            age : Number
        }
    }
}).generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person'
    // a prototype connection strategy will be used
}).insert({ 
    query: {
        firstName: "Adam",
        secondName: "Fenix"
        otherInfo: {
            age :50
        }
    }
}).then(ret => {
    console.log(ret)
}).catch((err) => {
    console.log(err)
})
```
##### Find (Find All)
To perform a find you must do the same as the insert
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

var personRep = MongoRepository.setModel({
    Person: {
        firstName: String,
        secondName: String,
    }
}).generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person'
    // a prototype connection strategy will be used
}).find({ 
    query: {
        firstName: "Adam"
    }
}).then(ret => {
    console.log(ret)
}).catch((err) => {
    console.log(err)
})
```
The `ret` return object is the `mongoose` return object and will containes all the element with `firstName: "Adam"`.
To do the find all just pass an empty query object
To perform a find you must do the same as the insert
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

var personRep = MongoRepository.setModel({
    Person: {
        firstName: String,
        secondName: String,
    }
}).generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person'
    // a prototype connection strategy will be used
}).find({ 
    query: { }
}).then(ret => {
    console.log(ret)
}).catch((err) => {
    console.log(err)
})
```
Now all the records will be founded.

##### Remove
The same ad Insert and Find
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

var personRep = MongoRepository.setModel({
    Person: {
        firstName: String,
        secondName: String,
    }
}).generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person'
    // a prototype connection strategy will be used
}).remove({ 
    query: {
        firstName: "Adam"
    }
}).then(ret => {
    console.log(ret)
}).catch((err) => {
    console.log(err)
})
```
This operation will remove all Persons with `firstName: "Adam"`.
##### Update
The update operation requires a `query` object to specify the object to search and an `update` object with the fields that must be apdated.
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

var personRep = MongoRepository.setModel({
    Person: {
        firstName: String,
        secondName: String,
    }
}).generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person'
    // a prototype connection strategy will be used
}).remove({ 
    query: { // element to find
        firstName: "Adam"
    }
    update : { // fields to be updated
        firstName: "Marcus"
    }
}).then(ret => {
    console.log(ret)
}).catch((err) => {
    console.log(err)
})
```
This operation will update all Persons with `firstName: "Adam"` to `firstName: "Marcus"`.
### Encryption
An On The Fly Repository able to encrypt and decrypt data from and to DB is also provided by mongodb-repository-wmf. 
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

var personRep = MongoRepository.setModel({
    SecretPerson: {
		firstName : String,
		secondName: String,
		firstSecretInfo : String,
		secondSecretInfo : String,
		otherInfo : {}
    }
}).generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'SecretPerson',
    singleton: false, // a prototype connection strategy will be used
    
    secret: true,
    parameters : ["firstSecretInfo", "secondSecretInfo"], // list of secret fields
    password : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" //your crypto key,if not present 3zTvzr3p67VC61jmV54rIYu1545x4TlY will be used 
}).insert({ 
    query: {
        firstName: "Adam",
        secondName: "Fenix",
    }
}).then(ret => {
    console.log(ret)
}).catch((err) => {
    console.log(err)
})
```
**Please note that the encryption is valid only for first level fields and must be String type, no field in otherInfo can be encrypted!**
In this way the `firstSecretInfo` and `secondSecretInfo` fields will be crypted before the insertion.
To read the data in an encrypted way tou must configure the On The Fly Repository as well done for the insert.
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

var personRep = MongoRepository.setModel({
    SecretPerson: {
		firstName : String,
		secondName: String,
		firstSecretInfo : String,
		secondSecretInfo : String,
		otherInfo : {}
    }
}).generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'SecretPerson'
    // a prototype connection strategy will be used
    
    secret: true,
    parameters : ["firstSecretInfo", "secondSecretInfo"], // list of secret fields
    password : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" //your crypto key,if not present 3zTvzr3p67VC61jmV54rIYu1545x4TlY will be used 
}).find({ 
    query: {
        firstName: "Adam"
    }
}).then(ret => {
    console.log(ret)
}).catch((err) => {
    console.log(err)
})
```
Now, you will have `firstSecretInfo` and `secondSecretInfo` fields decrypted.
## Examples ###
##### Multiple Operations with the same On The Fly Repository
See how to perform an insert and a find operation with the `same On The Fly Repository` and `singleton connection strategy`
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

var onFlyRep = MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person',
    singleton: true // a singleton connection strategy will be used
}).setModel({
    Person: {
        firstName: String,
        secondName: String,
    }
})
 
onFlyRep.insert({ // a new connection is opened now
    query: {
        firstName: "Adam",
        secondName: "Fenix"
    }
}).then(ret => { // the opened connection is still open
    console.log(ret)
    continueFunc() // function called after the insert
}).catch((err) => {
    console.log(err)
})
var continueFunc = function() {
    // ... do something
    doFind(); // now do the search
}

var doFind = function() {
    onFlyRep.find({ // execute another operation with the same connection
        query: {
            secondName: "Fenix"
        }
    }).then(ret => { 
        console.log(ret)
    }).catch((err) => { // the connection is still openend
    console.log(err)
    })
}
```
The same works with the prototype `connection strategy`.
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

var onFlyRep = MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person',
    singleton: false // a prototype connection strategy will be used
}).setModel({
    Person: {
        firstName: String,
        secondName: String,
    }
})
 
onFlyRep.insert({ // a first connection is opened now
    query: {
        firstName: "Adam",
        secondName: "Fenix"
    }
}).then(ret => { // the first opened connection is closed now
    console.log(ret)
    continueFunc() // function called after the insert
}).catch((err) => {
    console.log(err)
})
var continueFunc = function() {
    // ... do something
    doFind(); // now do the search
}

var doFind = function() {
    onFlyRep.find({ // a second connection is now opened
        query: {
            secondName: "Fenix"
        }
    }).then(ret => { 
        console.log(ret)
    }).catch((err) => { // the second opened connection is closed now
    console.log(err)
    })
}
```
##### Multiple Operations on the same Schema and same Connection Strategy
See how to perform an insert and a find operation with a `prototype connection strategy`.
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person'
    // a prototype connection strategy will be used
}).setModel({
    Person: {
        firstName: String,
        secondName: String,
    }
}).insert({ // a new connection is opened now
    query: {
        firstName: "Adam",
        secondName: "Fenix"
    }
}).then(ret => { // the opened connection is now closed
    console.log(ret)
    continueFunc() // function called after the insert
}).catch((err) => {
    console.log(err)
})

var continueFunc = function() {
    // ... do something
    doFind(); // now do the search
}

var doFind = function() {
    MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person'
    // a prototype connection strategy will be used
    }).find({ // no model loading is required because it is done before
        query: {
            secondName: "Fenix"
        }
    }).then(ret => { // a new connection is opened now
        console.log(ret)
    }).catch((err) => { // the opened connection is now closed
    console.log(err)
    })
}
```
For these two operations `two connections` was opened and closed.
To perfor the same operation with a `singleton connection strategy` just specify the singleton strategy in the repository configuration
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person',
    singleton: true // a singleton connection strategy will be used
}).setModel({
    Person: {
        firstName: String,
        secondName: String,
    }
}).insert({ // a connection is opened now
    query: {
        firstName: "Adam",
        secondName: "Fenix"
    }
}).then(ret => { // the opened connection is STILL OPEN
    console.log(ret)
    continueFunc() // function called after the insert
}).catch((err) => {
    console.log(err)
})

var continueFunc = function() {
    // ... do something
    doFind(); // now do the search
}

var doFind = function() {
    MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person',
    singleton: true // a singleton connection strategy will be used
    }).find({ // no model loading is required because it is done before
        query: {
            secondName: "Fenix"
        }
    }).then(ret => { // the before opened connection is used
        console.log(ret)
    }).catch((err) => { // the opened connection is STILL OPEN
    console.log(err)
    })
}
```
For these two operations `one connection` was opened and it is `still open`. To close this connection you must do
```javascript
// .. the code done before

// .. other code

MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person',
    singleton: true, // a singleton connection strategy will be used
}).closeSingletonConnection().then(ret => { // the singleton connection now is closed
    console.log("connection successfully closed");
}).catch(e => {
     console.log(e)
})
```
##### Multiple Operations on the same Schema and different Connection Strategies
Let see how to perform two diffent operations using the `singleton connection strategy` for one and the `prototype connection strategy` for the other.
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person',
    singleton: true // a singleton connection strategy will be used
}).setModel({
    Person: {
        firstName: String,
        secondName: String,
    }
}).insert({ // a connection is opened now
    query: {
        firstName: "Adam",
        secondName: "Fenix"
    }
}).then(ret => { // the opened connection is STILL OPEN
    console.log(ret)
    continueFunc() // function called after the insert
}).catch((err) => {
    console.log(err)
})

var continueFunc = function() {
    // ... do something
    doFind(); // now do the search
}

var doFind = function() {
    MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person',
    singleton: false // a prototype connection strategy will be used
    }).find({ // no model loading is required because it is done before
        query: {
            secondName: "Fenix"
        }
    }).then(ret => { // a new connection is opened
        console.log(ret)
    }).catch((err) => { // the new connection is closed
    console.log(err)
    })
}
```
For these two operations `two connections` was opened and just `one was closed` (the second one).
##### Multiple Operations on the different Schemas and different Connection Strategies
Let see how to perform two insert in `two different schema` (we will use `mixed connection strategy`)
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person'
    // a prototype connection strategy will be used
}).setModel({
    Person: {
        firstName: String,
        secondName: String,
    }
}).insert({ // a new connection is opened now
    query: {
        firstName: "Adam",
        secondName: "Fenix"
    }
}).then(ret => { // the opened connection is now closed
    console.log(ret)
    continueFunc() // function called after the insert
}).catch((err) => {
    console.log(err)
})

var continueFunc = function() {
    // ... do something
    doSecondInsert(); // now do the search
}

var doSecondInsert = function() {
    MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Animal',
    singleton: true // a singleton connection strategy will be used
    }).setModel({ // Animal Model must be loaded because it was never loaded before
        Animal: {
            name: String,
        }
    }).insert({ 
        query: {
            name: "Locust"
        }
    }).then(ret => { // a new connection is opened now
        console.log(ret)
    }).catch((err) => { // the new connection is still open
    console.log(err)
    })
}
```
## Performances and Best Practies
The real repository and the connection associated to him is created just when the first CRUD operation is called. After the operation execution the connection will be closed if a prototype connection strategy was choosed, otherwise the connection will stay open untill the close singleton connection methos call.
**Remember that the singleton connection strategy is associated to the url and not to the schema. So only one singleton connection can be opened for a specific url.**
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

var onTheFlyRep = MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person',
    singleton: true// a singleton connection strategy will be used
}).setModel({
    Person: {
        firstName: String,
        secondName: String,
    }
})
// untill there no connection is created a the repository is very cheap in memory usage
onTheFlyRep.insert({ // now the singleton connection is created
    query: {
        firstName: "Adam",
        secondName: "Fenix"
    }
}).then(ret => { 
    console.log(ret)
    // ... continue
}).catch((err) => {
    console.log(err)
})


// ... continue
var newOTheFlyRep = MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person',
    singleton: true// a singleton connection strategy will be used
})

// this second repository will use the same connection of the first and the same schema loading, so no more memory is used
```
Based on the previous example the best strategy is to create always On The Fly Repository and to use them once without creating a varibale for them. 
Moreover is convenient to load the model before the first On The Fly Repository because you may not know who is the first On The Fly Repository that will be called.
1) Create a constant for the repository configuration (one for schema)
2) Load the model before the first call (you can set the model directly in MongoRepository constant)
3) Use whenever you want an On The Fly Repository to perform a crud operation
```javascript
const MongoRepository = require('mongodb-repository-wmf').MongoRepository;

// (1) create (or import) a constant for the repository configuration for the Person Schema
const personRepConfig = { 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person',
    singleton: true// a singleton connection strategy will be used
}

// (2) load the model for the Person Schema
MongoRepository.setModel({
    Person: {
        firstName: String,
        secondName: String,
    }
})

// (3) then generate an On The Fly Repository for each required CRUD operation
MongoRepository.generateOnTheFlyRepository(personRepConfig).insert({ // now the singleton connection is created
    query: {
        firstName: "Adam",
        secondName: "Fenix"
    }
}).then(ret => { 
    console.log(ret)
    // ... continue 1
}).catch((err) => {
    console.log(err)
})


// ... continue
// (3)
MongoRepository.generateOnTheFlyRepository(personRepConfig).find({ 
    query: {
        firstName: "Marcus"
    }
}).then(ret => { 
    console.log(ret)
    // ... continue 2
}).catch((err) => {
    console.log(err)
})


// ... continue 2
// (3)
MongoRepository.generateOnTheFlyRepository(personRepConfig).remove({ 
    query: {
        firstName: "Cole"
    }
}).then(ret => { 
    console.log(ret)
    // ... continue 3
}).catch((err) => {
    console.log(err)
})

// ... continue 3
// (3)
MongoRepository.generateOnTheFlyRepository(personRepConfig).update({ 
    query: {
        firstName: "Adam"
    },
    update: {
        secondName: "Baird"
    }
}).then(ret => { 
    console.log(ret)
}).catch((err) => {
    console.log(err)
})
```
The choice of the `connection strategy` is on you, `moongose` suggests to use a `singleton strategy connection` for a NodeJs application. Bust sometimes you may use a `prototype strategy connection`.




