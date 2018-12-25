# mongodb-repository-wmf

*A Javascript One Code Line On The Fly MongoDb Repository*.

Use a fast and easy JavaScript On The Fly MongoDb Repository inspired to `Java Spring 5 MongoDb Reactive Repository`. 
`You don’t have to write an implementation of the repository` you have just to use it.
You will be able to choose the connection strategy (singleton or prototype) and to `perform a CRUD operation in only one line of code`. No need to care about the repository implementation or to open or close the connection.
Based on `mongoose` mongodb-repository-wmf is written in an object oriented way combined with the promise approach, this permitts to do all in one not interrupted code line.
An On The Fly Repository able to encrypt and decrypt data from and to DB is also provided by mongodb-repository-wmf.
## Installation
After the installation of [node.js](http://nodejs.org/) you must install [mongodb](https://www.mongodb.org/downloads) or use a database provider as [mLab](https://mlab.com/) . Then:

```sh
$ npm i mongodb-repository-wmf
```
## Importing
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;
```
## Contributors
If you want to join me please send me an email: `adem.hoxha@hotmail.it`.
## Take a Look
Let see how to perform an insert operation using an `on the fly` created repository:
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

OnTheFlyRepositoryFactory.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test', // use your connection string
    schemaName: 'Person',
    singleton: false // set to true if want to use a singleton connection strategy
}).setModel({ // must loaded only for the first On The Fly Repository
    Person: {
        firstName: String,
        secondName: String,
        otherInfo: {
            age: Number
        }
    }
}).insert({
    query: {
        firstName: "Adam",
        secondName: "Fenix",
        otherInfo: {
            age: 55
        }
    }
}).then(ret => {
    console.log(ret)
}).catch((err) => {
    console.log(err)
})
```
The model loading is requested by `mongoose`, you have to do it just once for each schema. The repository will be created only when the operation insert is called.
You do not have to care about the connection opening or the connection closing or the other mongoose issues, you must just specify the db url, the schema name and the schema model and one on the fly repository will be ready for you. In the previuos example cthe prototype connection strategy was used.
For more complex examples please see the [Examples](#Examples) section and the [Performances and Best Practies](#Performances-and-Best-Practies) section for the best usage approach.
## Overview of the version 3
The On The Fly Repository is added in the version 3 of `mongodb-repository-wmf` and it is the only Repository type that will be updated in the future. Version 2 or Version 1 features will still works because the `backward compatibility is guaranteed`.
### Configure the On The Fly Repository
To configure the On The Fly Repository you must invoke the generate method with a configuration JSON Object.
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

var onFlyRep = OnTheFlyRepositoryFactory.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person',
    singleton: true, // a singleton connection strategy will be used
    secret: false // it is not a Repository with encryption capability
})
```
Choosing `singleton: true` a singleton connection strategy repository will be generated for that specified `url`. 
Note if you will try to generate another singleton connection strategy repository for the same `url` it will use the same connection. 
To generate a new singleton connection you must before close the old singleton connection.
### Prototype Connection Strategy
The prototype connection strategy will open a new connection everytime a CRUD operation is invoked and that connection will be closed once the operation is ended.
```javascript
OnTheFlyRepositoryFactory.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person',
    singleton: false,
}).find({ // *** a new connection is open ***
    query: {
         firstName: "Adam"
    }
}).then( (ret) => { // *** now the open connection is closed ***
    console.log(ret)
}).catch( (err) => {
    console.log(err)
})
```
### Singleton Connection Strategy
The singleton connection strategy will open a new connection only for the first CRUD operation and that connection will stay opened untill the `closeSingletonConnection` will be called. See how to close the singleton connection:
```javascript
MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person',
    singleton: false, // a prototype connection strategy will be used
}).closeSingletonConnection().then(ret => {
    console.log("connection successfully closed");
}).catch(e => {
     console.log(e)
})
```
### Model Loading
Before executing any CRUD operation a model must be loaded (do it just once) if it was not loaded before.
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

var onFlyRep = OnTheFlyRepositoryFactory.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person'
    // a prototype connection strategy will be used
}).loadModel({
    Person: {
        firstName: String,
        secondName: String,
    }
})
```
You must load just the needed schema (Person in this case).
It is also possible to load the model before the repository configuration
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

var onFlyRep = OnTheFlyRepositoryFactory.loadModel({
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
This is possible because the connection creation happens only when the CRUD operation is invoked (see [Prototype Connection Strategy](#Prototype-Connection-Strategy) and [Singleton Connection Strategy](#Singleton-Connection-Strategy).
If you want to generate another On The Fly Repository with the same schemaName you do not have to load again the model. You must do it only if you want to ovverride that model or want to add a new one.

```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

var personRep = OnTheFlyRepositoryFactory.loadModel({
    Person: {
        firstName: String,
        secondName: String,
    }
}).generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person'
    // a prototype connection strategy will be used
})

var newPersonRep = OnTheFlyRepositoryFactory.generateOnTheFlyRepository({  // no model loading is required (you done it before)
    url: 'mongodb://localhost/test',
    schemaName: 'Person'
    // a prototype connection strategy will be used
})

var animalRep = OnTheFlyRepositoryFactory.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Animal'
    // a prototype connection strategy will be used
}).loadModel({ // here you must load Animal for the first time
    Animal: {
        name: String,
    }
})

var newPersonRep2 = OnTheFlyRepositoryFactory.generateOnTheFlyRepository({  // no model loading is required (you done it before)
    url: 'mongodb://localhost/test',
    schemaName: 'Person'
    // a prototype connection strategy will be used
})

var animalRep = OnTheFlyRepositoryFactory.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Animal'
    // a prototype connection strategy will be used
}).loadModel({ // here you must load Animal again because you changed the schema (sex is added now)
    Animal: {
        name: String,
        sex: String // added field in the schema
    }
})
```
So, each model must be loaded once and can be overwritten by loading it again.
### CRUD Operations
Careless the connection strategy of the Repository you can perform:
1) insert
2) find (find all)
3) remove
4) update
All the examples follows the [Performances and Best Practies](#Performances-and-Best-Practies) guidelines.
##### Insert
To perform an insert query you must invoke the insert method passing a JSON Object with the `query` field that specify the element to insert.
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const personConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: false // prototype connection strategy
}

OnTheFlyRepositoryFactory.loadModel({
    Person: {
        firstName: String,
        secondName: String,
    }
})

OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).insert({
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
##### Find (Find All)
To perform a find query:
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const personConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: false // prototype connection strategy
}

OnTheFlyRepositoryFactory.loadModel({
    Person: {
        firstName: String,
        secondName: String,
    }
})

OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).find({ 
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
To do the find all query just pass an empty `query` object.
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const personConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: false // prototype connection strategy
}

OnTheFlyRepositoryFactory.loadModel({
    Person: {
        firstName: String,
        secondName: String,
    }
})

OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).find({ 
    query: {
        firstName: "Adam"
    }
}).then(ret => {
    console.log(ret)
}).catch((err) => {
    console.log(err)
})
```
Now all the records will be founded.

##### Remove
To perform a remove query:
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const personConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: false // prototype connection strategy
}

OnTheFlyRepositoryFactory.loadModel({
    Person: {
        firstName: String,
        secondName: String,
    }
})

OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).remove({ 
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
The update operation requires a `query` object to specify the object to search (similar to the find operation) and an `update` object with the fields that must be apdated.
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const personConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: false // prototype connection strategy
}

OnTheFlyRepositoryFactory.loadModel({
    Person: {
        firstName: String,
        secondName: String,
    }
})

OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).update({ 
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
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const secretPersonConfig = {
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'SecretPerson',
    singleton: false, // a prototype connection strategy will be used
    
    secret: true, // encrypt features enabled
    parameters : ["firstSecretInfo", "secondSecretInfo"], // list of secret fields
    password : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" //your crypto key,if not present 3zTvzr3p67VC61jmV54rIYu1545x4TlY will be used 
}

OnTheFlyRepositoryFactory.loadModel({
    SecretPerson: {
		firstName : String,
		secondName: String,
		firstSecretInfo : String,
		secondSecretInfo : String
    }
})

OnTheFlyRepositoryFactory.generateOnTheFlyRepository(secretPersonConfig).insert({ 
    query: {
        firstName: "Adam",
        secondName: "Fenix",
        firstSecretInfo : "Secret",
		secondSecretInfo : Secret"
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
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const secretPersonConfig = {
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'SecretPerson',
    singleton: false, // a prototype connection strategy will be used
    
    secret: true, // encrypt features enabled
    parameters : ["firstSecretInfo", "secondSecretInfo"], // list of secret fields
    password : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" //your crypto key,if not present 3zTvzr3p67VC61jmV54rIYu1545x4TlY will be used 
}

OnTheFlyRepositoryFactory.loadModel({
    SecretPerson: {
		firstName : String,
		secondName: String,
		firstSecretInfo : String,
		secondSecretInfo : String
    }
})

OnTheFlyRepositoryFactory.generateOnTheFlyRepository(secretPersonConfig).find({ 
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
## Performances and Best Practies
The real repository and the connection associated to him is created just when the first CRUD operation is called. After the operation execution the connection will be closed if a prototype connection strategy was choosed, otherwise the connection will stay open untill the close singleton connection method call.
**Remember that the singleton connection strategy is associated to the url and not to the schema. So only one singleton connection can be opened for a specific url.**
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const personConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: false // prototype connection strategy
}

var onTheFlyRep = OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).loadModel({
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
var newOTheFlyRep = OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig)

// this second repository will use the same connection of the first and the same schema loading due to the singleton choise, so no more memory is used
```
Based on the previous example the best strategy is to create always On The Fly Repository and to use them once without creating a varibale for them. 
Moreover is convenient to load the model before the first On The Fly Repository because you may not know who is the first On The Fly Repository that will be called.
1) Create a constant for the repository configuration (one for schema)
2) Load the model before the first call (you can set the model directly in MongoRepository constant)
3) Use whenever you want an On The Fly Repository to perform a crud operation
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const personConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: false // prototype connection strategy
}

// (2) load the model for the Person Schema
OnTheFlyRepositoryFactory.loadModel({
    Person: {
        firstName: String,
        secondName: String,
    }
})

// (3) then generate an On The Fly Repository for each required CRUD operation
OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).update({
    query: {
        firstName: "Adam",
        secondName: "Fenix"
    },
    update: {
        firstName: "Cole"
    }
}).then(r1 => {
    console.log("**** update is ok ****");
    console.log(r1);
    // (3) then generate an On The Fly Repository for each required CRUD operation
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).find({  
        query: {
            firstName: "Cole"
        }
    });
}).then(r2 => {
    console.log("**** find is ok ****");
    console.log(r2);
}).catch(err => {
    console.log("**** error ****");
    console.log(err);
})

```
The choice of the `connection strategy` is on you, `moongose` suggests to use a `singleton strategy connection` for a NodeJs application. Bust sometimes you may use a `prototype strategy connection`.


## Examples ###
##### Multiple Operations on the same schema using the same connection strategy
See how to perform an update and a find operation with the `On The Fly Repositories` using a `singleton connection strategy` and closing it at the end.
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const personConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: true // singleton connection strategy
}

OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).loadModel({
    Person: {
        firstName: String,
        secondName: String,
    }
}).update({
    query: {
        firstName: "Marcus",
        secondName: "Fenix"
    },
    update: {
        firstName: "Cole"
    }
}).then(r1 => {
    console.log("**** update is ok ****");
    console.log(r1);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).find({
        query: {
            firstName: "Cole"
        }
    });
}).then(r2 => {
    console.log("**** find is ok ****");
    console.log(r2);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).closeSingletonConnection(); // close singleton connection
}).then(r3 => {
    console.log("**** singleton connection is closed ****");
}).catch(err => {
    console.log("**** error ****");
    console.log(err);
})
```
The same works with the `prototype connection strategy`.
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const personConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: false // prototype connection strategy
}

OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).loadModel({
    Person: {
        firstName: String,
        secondName: String,
    }
}).update({
    query: {
        firstName: "Marcus",
        secondName: "Fenix"
    },
    update: {
        firstName: "Cole"
    }
}).then(r1 => {
    console.log("**** update is ok ****");
    console.log(r1);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).find({
        query: {
            firstName: "Cole"
        }
    });
}).then(r2 => {
    console.log("**** find is ok ****");
    console.log(r2);
}).catch(err => {
    console.log("**** error ****");
    console.log(err);
})
```
##### Multiple Operations on the same schema using different connection strategies
See how to perform an update and a find operation on the same schema with different `connection strategies`.
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const singletonConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: true // singleton connection strategy
}

const prototypeConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: false // prototype connection strategy
}

OnTheFlyRepositoryFactory.loadModel({
    Person: {
        firstName: String,
        secondName: String,
    }
}).

OnTheFlyRepositoryFactory.generateOnTheFlyRepository(singletonConfig).update({ // singleton on the fly repository
    query: {
        firstName: "Marcus",
        secondName: "Fenix"
    },
    update: {
        firstName: "Cole"
    }
}).then(r1 => {
    console.log("**** update is ok ****");
    console.log(r1);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(prototypeConfig).find({ // prototype on the fly repository
        query: {
            firstName: "Cole"
        }
    });
}).then(r2 => {
    console.log("**** find is ok ****");
    console.log(r2);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(singletonConfig).closeSingletonConnection(); // close singleton connection
}).then(r3 => {
    console.log("**** singleton connection is closed ****");
}).catch(err => {
    console.log("**** error ****");
    console.log(err);
})
```
##### Multiple Operations on different schemas using different connection strategies
Let see how to perform diffent operations to different schemas using different `connection strategies`.
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const personConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: true // singleton connection strategy
}

const animalConfig = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Animal', // schema name
    singleton: false // prototype connection strategy
}

OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).loadModel({
    Person: {
        firstName: String,
        secondName: String,
    }
}).update({
    query: {
        firstName: "Cole",
        secondName: "Cole"
    },
    update: {
        firstName: "Cole",
        otherInfo: {
            age: 25
        }
    }
}).then(r1 => {
    console.log("**** update is ok ****");
    console.log(r1);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(animalConfig).loadModel({
        Animal: {
            name: String
        }
    }).find({
        query: {
            name: "Locust"
        }
    });
}).then(r2 => {
    console.log("**** find is ok ****");
    console.log(r2);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).closeSingletonConnection(); // close the singleton connection
}).then(r3 => {
    console.log("**** singleton connection is closed ****");
}).catch(err => {
    console.log("**** error ****");
    console.log(err);
})
```