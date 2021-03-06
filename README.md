# mongodb-repository-wmf

[![npm](https://nodei.co/npm/mongodb-repository-wmf.png)](https://www.npmjs.com/package/mongodb-repository-wmf)

*A fine JavaScript (and TypeScript) module for using on the fly created repositories based on mongoose and designed over the JavaScript promises API*.

You don’t have to write an implementation of the repository you have just to use an **on the fly generated one**.

`mongodb-repository-wmf` implements the [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html) over [mongoose](https://www.npmjs.com/package/mongoose).

No more need to care about the repository implementation or about opening and closing connections, it is all done behind the scenes by `mongodb-repository-wmf`.

`mongodb-repository-wmf` is an easy and fast to use feature inspired to [Java Spring 5 MongoDb Reactive Repository](https://spring.io/blog/2016/11/28/going-reactive-with-spring-data) that gives to you an on the fly implementation of the [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html). 

From the Martin Fowler [web site](https://martinfowler.com/eaaCatalog/repository.html):

*"A Repository mediates between the domain and data mapping layers, acting like an in-memory domain object collection. Client objects construct query specifications declaratively and submit them to Repository for satisfaction. Objects can be added to and removed from the Repository, as they can from a simple collection of objects, and the mapping code encapsulated by the Repository will carry out the appropriate operations behind the scenes."*

It means that adding, removing, updating, and selecting DB items is done by straightforward methods of the repository, as for the standard JavaScript Array you have Array.prototype.push() for the Repository you will have something like Repository.prototype.insert().

And as for standard collection you are able to use these methods without writing their implementation. 

You will be able to configure the `connection strategy` (singleton or prototype) and thanks to the promises API to `perform a CRUD operation in a vertically not interrupted code sequence`. 

One on the fly generated repository `able to encrypt and decrypt data from and to DB` is also provided.
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
Pull requests are always welcome! Please base pull requests against the master branch and be sure to pass all test cases and to update the `History.md` and the `README.md` if needed. To run the test cases please execute `npm run test`.
## Take a Look
Let see how to perform a single [insert](#Insert) operation using an `on the fly` created repository:

1) If your [node.js](http://nodejs.org/) version supports [Async Functions](#Repository-Operations-With-Await).
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

var asyncFunc = async function() {  // define an async function
    try {
        let ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository({ // configure your on the fly repository [1]
                url: 'mongodb://localhost/test', // use your connection string
                schemaName: 'Person',
                singleton: false // set to true if want to use a singleton connection strategy [2]
            }).loadModel({ // model must loaded only for the first on the fly repository (mongoose requires it) [3]
                Person: {
                    firstName: String,
                    secondName: String,
                    otherInfo: {
                        age: Number
                    }
                }
            }).insert({ // a repository is created now on the fly and a new connection is opened [4]
                query: { // use all the mongoose power writing your query [5]
                    firstName: "Adam",
                    secondName: "Fenix",
                    otherInfo: {
                        age: 55
                    }
                }
                
        console.log("**** insert is ok ****");
        console.log(ret);
    }
    catch (err){
        console.log("**** error ****");
        console.log(err);
    }
}

asyncFunc(); // call the async function
```

2) If your [node.js](http://nodejs.org/) version does not support [Async Functions](#Repository-Operations-With-Await).

```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

OnTheFlyRepositoryFactory.generateOnTheFlyRepository({ // configure your on the fly repository [1]
    url: 'mongodb://localhost/test', // use your connection string
    schemaName: 'Person',
    singleton: false // set to true if want to use a singleton connection strategy [2]
}).loadModel({ // model must loaded only for the first on the fly repository (mongoose requires it) [3]
    Person: {
        firstName: String,
        secondName: String,
        otherInfo: {
            age: Number
        }
    }
}).insert({ // a repository is created now on the fly and a new connection is opened [4]
    query: { // use all the mongoose power writing your query [5]
        firstName: "Adam",
        secondName: "Fenix",
        otherInfo: {
            age: 55
        }
    }
}).then(ret => {  // the previously opened connection here is closed  [6]
    console.log(ret)
}).catch((err) => { // [7]
    console.log(err)
})
```
The model loading `[3]` is requested by [mongoose](https://www.npmjs.com/package/mongoose) [(doc)](https://mongoosejs.com/docs/models.html), you have to do it just once for each schema [(Model Loading)](#Model-Loading). 

You do not have to care about the connection opening or the connection closing or the other [mongoose](https://www.npmjs.com/package/mongoose) issues, you have just to configure the reposity `[1]` specifying:
1) the db url [(Configure the On The Fly Repository)](#Configure-the-On-The-Fly-Repository)
2) the schema name [(Configure the On The Fly Repository)](#Configure-the-On-The-Fly-Repository)
3) the connection strategy [(Prototype Connection Strategy](#Prototype-Connection-Strategy) , [Singleton Connection Strategy)](#Singleton-Connection-Strategy).

Only when the operation insert is called `[4]` a repository will be created on the fly. 

A [mongoose](https://www.npmjs.com/package/mongoose) query expression [(doc)](https://mongoosejs.com/docs/queries.html) must be passed to the insert operation `[5]`.

And the operation result `[6]` is a [JavaScript promise](https://www.promisejs.org/).

The `ret` `[6]` and the `err` `[7]` objects are the [mongoose](https://www.npmjs.com/package/mongoose) `ret` and `err` objects [(doc)](https://mongoosejs.com/docs/queries.html). But the `err` object can be a `mongodb-repository-wmf` error too. For the all `mongodb-repository-wmf` defined `error type list` please refer to [Errors](#Errors).

In the previuos example the prototype connection strategy was used `[2]`, so the on the fly created repository made the connection for you once the operation was invoked `[4]` and close the connection when the operation ended `[6]`. All it is done behind the scenes by `mongodb-repository-wmf`.


For more complex examples please see the [Examples](#Examples) section and the [Performances and Best Practies](#Performances-and-Best-Practies) section for the best usage approach.
## Overview of the version 3
The On The Fly Repository is added in the version 3 of `mongodb-repository-wmf` and it is the only Repository type that will be updated in the future. 

Version 2 or Version 1 features will still works because the `backward compatibility is always guaranteed`. For these versions please see [Backward Compatibility](#Backward-Compatibility).

*Here a list of the most relevant features introduced with the different versions*

Since version `3.1.4` of `mongodb-repository-wmf` is possible to `open a singleton connection` without calling a CRUD operation.

Since version `3.1.3` of `mongodb-repository-wmf` is possible to call the `closeSingletonConnetion` method without passing a valid schema name.

Since version `3.1.3` of `mongodb-repository-wmf` the `Add All` functionality is added.

Since version `3.1.3` `mongodb-repository-wmf` has is own `Error Type List`.

Since version `3.1.3` of `mongodb-repository-wmf` the `mocha tests` are added.

Since version `3.1.0` of `mongodb-repository-wmf` the operation `update` and `remove` will update and remove all matched elements and not only the first one.

Since version `3.1.0` `mongodb-repository-wmf` is written in `typescript`.

Since version `3.0.0` `mongodb-repository-wmf` use the `on the fly` created repository.
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


For a repository with encryption capability see [Encryption](#Encryption).
### Prototype Connection Strategy
The prototype connection strategy will open a new connection everytime a CRUD operation is invoked and that connection will be closed once the operation is ended.
```javascript
OnTheFlyRepositoryFactory.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    schemaName: 'Person',
    singleton: false, // prototype connection strategy
}).find({ // *** a new connection is open ***
    query: {
         firstName: "Adam"
    }
}).then( (ret) => { // *** now the opened connection is closed ***
    console.log(ret)
}).catch( (err) => {
    console.log(err)
})
```
### Singleton Connection Strategy
The singleton connection strategy will open a new connection only when the first CRUD operation is called.

Since version `3.1.4` of `mongodb-repository-wmf` is possible to open the singleton connection just invoking the `openSingletonConnection` method.

```javascript
MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    // schema name is not needed to open the singleton connection
    singleton: true, // singleton connection strategy
}).openSingletonConnection().then(ret => {
    console.log("connection successfully opened");
}).catch(e => {
     console.log(e)
})
```

That connection will stay opened untill the `closeSingletonConnection` will be called. 

Below is showed how to close a singleton connection:
```javascript
MongoRepository.generateOnTheFlyRepository({ 
    url: 'mongodb://localhost/test',  // use your connection string
    // schema name is not needed for to close the singleton connection
    singleton: true, // singleton connection strategy
}).closeSingletonConnection().then(ret => {
    console.log("connection successfully closed");
}).catch(e => {
     console.log(e)
})
```
The singleton connection is associated to the `url` and not to the `schema` or to a specific on the fly repository. So, all on the fly repositories associated to the same `url` and with a `singleton connection strategy` will share the same connection. Since version `3.1.0` of `mongodb-repository-wmf` it is no need to pass the `schema` into the configuration of the repository when you wanto to close the singleton connection (for previous versions you have to pass a valid schema).
### Model Loading
Before executing any CRUD operation for a specific schema its model must be loaded if it was not loaded before, that is because `mongodb-repository-wmf` is based on [mongoose](https://www.npmjs.com/package/mongoose) [(doc)](https://mongoosejs.com/docs/models.html).

The model for a schema must be loaded only once.
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
You must load just the needed schema (`Person` in this case).

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
This is possible because the repository is created on the fly only when the CRUD operation is invoked (see [Prototype Connection Strategy](#Prototype-Connection-Strategy) and [Singleton Connection Strategy)](#Singleton-Connection-Strategy).

If you want to use another repository created on the fly with the same schemaName you do not have to load again the model. 

You must do it only if you want to ovverride that model or want to add a new one.
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

var newPersonRep = OnTheFlyRepositoryFactory.generateOnTheFlyRepository({  // no model loading is required (you did it before)
    url: 'mongodb://localhost/test',  // use your connection string
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

var newPersonRep2 = OnTheFlyRepositoryFactory.generateOnTheFlyRepository({  // no model loading is required (you did it before)
    url: 'mongodb://localhost/test',  // use your connection string
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
1) [Insert](#Insert)
2) [Insert All](#Insert-All)
2) [Find](#Find-And-Find-All)
3) [Remove](#Remove)
4) [Update](#Update)

All the examples follows the [Performances and Best Practies](#Performances-and-Best-Practies) guidelines.
##### Insert
To perform an insert operation you must invoke the insert method passing a JSON Object with the `query` field that specify the element to insert.
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
This operation will insert a new Person with `firstName: "Adam"` and `secondName: "Fenix"`. 

The `query` object can use all the [mongoose](https://www.npmjs.com/package/mongoose) power for more complicated structures.

The `ret` and the `err` objects are the [mongoose](https://www.npmjs.com/package/mongoose) `ret` and `err` objects [(doc)](https://mongoosejs.com/docs/queries.html). But the `err` object can be a `mongodb-repository-wmf` error too. For the all `mongodb-repository-wmf` defined `error type list` please refer to [Errors](#Errors).

In case of successful operation `ret` will contain the inserted element.
##### Insert All
*Since version `3.1.3` of `mongodb-repository-wmf`.*

To perform an insert all operation you must invoke the insert method passing an array of JSON Object with the `query` field that specify the element to insert.
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

OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).insert(
    [
        {   query: {
            firstName: "Adam",
            secondName: "Fenix"
        },
        {   query: {
            firstName: "Domenic",
            secondName: "Santiago"
        }
    ]
}).then(ret => {
    console.log(ret)
}).catch((err) => {
    console.log(err)
})
```
This operation will insert two people: the first one with `firstName: "Adam"` and `secondName: "Fenix"` and the second one with `firstName: "Domenic"` and `secondName: "Santiago"`. 

In the insert with a single element and in the insert with many elements `different` [mongoose](https://www.npmjs.com/package/mongoose) operation will be executed. For the insert all operation the [inserMany](https://mongoosejs.com/docs/api.html#model_Model.insertMany) [mongoose](https://www.npmjs.com/package/mongoose) function is used. 

**NOTE: if you are trying to save at `the same time` (insert all operation) duplicate elements to the db where the `only difference will be the _id` that will be associated to each of them, the operation will fail with an index duplication error!!!  [(see)](https://github.com/Automattic/mongoose/issues/4978)**

The `query` object can use all the [mongoose](https://www.npmjs.com/package/mongoose) power for more complicated structures.

The `ret` and the `err` objects are the [mongoose](https://www.npmjs.com/package/mongoose) `ret` and `err` objects [(doc)](https://mongoosejs.com/docs/queries.html). But the `err` object can be a `mongodb-repository-wmf` error too. For the all `mongodb-repository-wmf` defined `error type list` please refer to [Errors](#Errors).

In case of successful operation `ret` will contain the inserted elements.
##### Find And Find All
To perform a find operation you must invoke the find method passing a JSON Object with the `query` field that specify the element to find.
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
This operation will found all the element with `firstName: "Adam"`.

The `query` object can use all the [mongoose](https://www.npmjs.com/package/mongoose) power for more complicated structures.

The `ret` and the `err` objects are the [mongoose](https://www.npmjs.com/package/mongoose) `ret` and `err` objects [(doc)](https://mongoosejs.com/docs/queries.html). But the `err` object can be a `mongodb-repository-wmf` error too. For the all `mongodb-repository-wmf` defined `error type list` please refer to [Errors](#Errors).

In case of successful operation `ret` will contain the founded elements.


To perform a find all operation you must pass an empty `query` object.
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
    query: { }
}).then(ret => {
    console.log(ret)
}).catch((err) => {
    console.log(err)
})
```
Now all the records will be founded.
##### Remove
To perform a remove operation you must invoke the remove method passing a JSON Object with the `query` field that specify the element to remove.

**Note**: *Since version `3.1.0` of `mongodb-repository-wmf`.* the remove operation is a Remove All, so each matched element will be removed. Before was an remove one operation.
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
This operation will remove all `People` with `firstName: "Adam"`.

The `query` object can use all the [mongoose](https://www.npmjs.com/package/mongoose) power for more complicated structures.

The `ret` and the `err` objects are the [mongoose](https://www.npmjs.com/package/mongoose) `ret` and `err` objects [(doc)](https://mongoosejs.com/docs/queries.html). But the `err` object can be a `mongodb-repository-wmf` error too. For the all `mongodb-repository-wmf` defined `error type list` please refer to [Errors](#Errors).

In case of successful operation `ret` will be `{ n: #, ok: 1 }` where `#` is the number of removed element.
##### Update
To perform an update operation you must invoke the update method passing a JSON Object with the `query` field that specify the element to update and an `update` object with the fields that must be apdated.

Note: *Since version `3.1.0` of `mongodb-repository-wmf`.* the update operation is an Update All, so each matched element will be updated. Before was an update one operation.
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
This operation will update all `People` with `firstName: "Adam"` to `firstName: "Marcus"`.

The `query` and the `update` objects can use all the [mongoose](https://www.npmjs.com/package/mongoose) power for more complicated structures.

The `ret` and the `err` objects are the [mongoose](https://www.npmjs.com/package/mongoose) `ret` and `err` objects [(doc)](https://mongoosejs.com/docs/queries.html). But the `err` object can be a `mongodb-repository-wmf` error too. For the all `mongodb-repository-wmf` defined `error type list` please refer to [Errors](#Errors).

In case of successful operation `ret` will be `{ n: #1, nModified: #2, ok: 1 }` where `#1` is the number of matched element and `#2` is the number of element that required the fields update.
##### Chaining Repository Operations
Thanks to the [JavaScript promises API](https://www.promisejs.org/) and the `mongodb-repository-wmf` capability to generate on the fly repository you can scale vertically without any code interruption.

Let see how to chain repository operations.
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const personConfig = { 
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: false // prototype connection strategy
}

OnTheFlyRepositoryFactory.loadModel({ // [1]
    Person: {
        firstName: String,
        secondName: String,
    }
});

OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).update({ // first repository operation [2]
    query: {
        firstName: "Marcus",
        secondName: "Fenix"
    },
    update: {
        firstName: "Cole"
    }
}).then(r1 => { // promise of the update operation [3]
    console.log("**** update is ok ****");
    console.log(r1);
    return OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).find({ // second repository operation [4]
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
After the [(Model Loading)](#Model-Loading) `[1]` a new on the fly repository is generated `[2]` and an [update](#Update) operation is executed. In the returned promise of the first operation `[3]` a new on the fly repository is created and a [find](#Find-And-Find-All) operation is returned `[4]` that it is itself a promise. 

In this way is possible to chain an unlimited number of [CRUD Operations](#CRUD-Operations).
##### Repository Operations With Await
If your [node.js](http://nodejs.org/) version supports [asyc function](https://node.green/#ES2017-features-async-functions) you can use the [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) instruction to have a more readable code:

```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const personConfig = { 
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: false // prototype connection strategy
}

OnTheFlyRepositoryFactory.loadModel({ // [1]
    Person: {
        firstName: String,
        secondName: String,
    }
});


var asyncFunc = async function() {  // define an async function
    try {
        let ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).insert({ // first insert
            query: {
                firstName: "Marcus",
                secondName: "Fenix"
            }
        });
        console.log("**** first insert is ok ****");
        console.log(ret);
        
        ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(personConfig).insert({ // second insert
            query: {
                firstName: "Marcus",
                secondName: "Fenix"
            }
        });
        
        console.log("**** second insert is ok ****");
        console.log(ret); 
    }
    catch (err){
        console.log("**** error ****");
        console.log(err);
    }
}

asyncFunc(); // call the async function
```
### Encryption
An On The Fly Repository able to encrypt and decrypt data from and to DB is also provided by `mongodb-repository-wmf`. 
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
});

OnTheFlyRepositoryFactory.generateOnTheFlyRepository(secretPersonConfig).insert({ 
    query: {
        firstName: "Adam",
        secondName: "Fenix",
        firstSecretInfo : "Secret",
		secondSecretInfo : "Secret"
    }
}).then(ret => {
	console.log(ret)
}).catch((err) => {
	console.log(err)
})
```
**Please note that the encryption is valid only for first level fields and each field must be String type, no field in otherInfo can be encrypted!**

In this way the `firstSecretInfo` and `secondSecretInfo` fields will be crypted before the insertion.

The `query` object can use all the [mongoose](https://www.npmjs.com/package/mongoose) power for more complicated structures.

The `ret` and the `err` objects are the [mongoose](https://www.npmjs.com/package/mongoose) `ret` and `err` objects [(doc)](https://mongoosejs.com/docs/queries.html). But the `err` object can be a `mongodb-repository-wmf` error too. For the all `mongodb-repository-wmf` defined `error type list` please refer to [Errors](#Errors).


To read the data in an encrypted way you must configure the On The Fly Repository as well as done before for the insert.
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
});

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

The `query` object can use all the [mongoose](https://www.npmjs.com/package/mongoose) power for more complicated structures.

The `ret` and the `err` objects are the [mongoose](https://www.npmjs.com/package/mongoose) `ret` and `err` objects [(doc)](https://mongoosejs.com/docs/queries.html). But the `err` object can be a `mongodb-repository-wmf` error too. For the all `mongodb-repository-wmf` defined `error type list` please refer to [Errors](#Errors).
## Performances and Best Practies
The repository and the connection associated to it will be created on the fly just when a [CRUD operation](#CRUD-Operations) is invoked. After the operation execution the connection will be closed if a [prototype connection strategy](#Prototype-Connection-Strategy) was choosed, otherwise the connection will stay open untill the [close singleton connection method call](#Singleton-Connection-Strategy).

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
Based on the previous example the best strategy is to create always an on the fly Repository and to use it once without creating a varibale for it. 

Moreover is convenient to load the model before the first on the fly Repository because you may not know who is the first on the fly Repository that will be called.
1) Create a constant for the [repository configuration](#Configure-the-On-The-Fly-Repository) (one for schema).
2) [Load the model](#Model-Loading) before the first call (you can set the model directly in the *OnTheFlyRepositoryFactory*).
3) Use whenever you want a *new* on the fly Repository to perform a [CRUD operation](#CRUD-Operations), do not store it in a variable.
4) Always take advantage of [JavaScript promises API](https://www.promisejs.org/) to scale vertically by [chaining repository operations](#Chaining-Repository-Operations). **Better** to use [Async Functions](#Repository-Operations-With-Await) if your [node.js](http://nodejs.org/) version supports them [(see)](#Repository-Operations-With-Await).
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

// (3) then use an on the fly generated Repository for each required CRUD operation
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
    // (3) use another on the fly generated repository and always take advantage of promise API to scale vertically (4)
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
The choice of the `connection strategy` is on you, [mongoose](https://www.npmjs.com/package/mongoose) suggests to use a [Singleton Connection Strategy](#Singleton-Connection-Strategy) for a NodeJs application. Bust sometimes you may use a [Prototype Connection Strategy](#Prototype-Connection-Strategy).
## Errors
*Since version `3.1.3` of `mongodb-repository-wmf`.*

Below the `error type list` returned by `mongodb-repository-wmf`:
1) `ConnectionError`: refering to a not valid url parameter in the [repository configuration](#Configure-the-On-The-Fly-Repository); an accurate description will be returned with the error.
2) `SchemaError`: refering to some issues with the schema, maybe the schema is [not loadel](#Model-Loading) or the `schemaName` is invalid; an accurate description will be returned with the error.
3) `SingletonError`: refering to a not valid operation on [Singleton Connection Strategy](#Singleton-Connection-Strategy) like closining a not opened singleton connection; an accurate description will be returned with the error.
4) `ObjectError`: refering to all invalid objects and fields passed in the [repository configuration](#Configure-the-On-The-Fly-Repository) and in the [CRUD operations](#CRUD-Operations); an accurate description will be returned with the error.

Will be returned a [mongoose](https://www.npmjs.com/package/mongoose) error if something will be not ok with some [mongoose](https://www.npmjs.com/package/mongoose) operations.
## Examples ###
Each example follows the `mongodb-repository-wmf`  [Performances and Best Practies](#Performances-and-Best-Practies) guidelines.
1) Create a constant for the [repository configuration](#Configure-the-On-The-Fly-Repository) (one for schema).
2) [Load the model](#Model-Loading) before the first call (you can set the model directly in the *OnTheFlyRepositoryFactory*).
3) Use whenever you want a *new* on the fly Repository to perform a [CRUD operation](#CRUD-Operations), do not store it in a variable.
4) Always take advantage of [JavaScript promises API](https://www.promisejs.org/) to scale vertically by [chaining repository operations](#Chaining-Repository-Operations). **Better** to use [Async Functions](#Repository-Operations-With-Await) if your [node.js](http://nodejs.org/) version supports them [(see)](#Repository-Operations-With-Await).

For more general usage these example are maded using the [JavaScript promises API](https://www.promisejs.org/) and [chaining repository operations](#Chaining-Repository-Operations) except for the first one.

For all the [CRUD operations](#CRUD-Operations) please refer to:
1) [Insert](#Insert)
2) [Insert All](#Insert-All)
2) [Find](#Find-And-Find-All)
3) [Remove](#Remove)
4) [Update](#Update)

For the all `mongodb-repository-wmf` defined `error type list` please refer to [Errors](#Errors).
##### Multiple Operations on the same schema using the same connection strategy with Async Functions
See how to perform an update and a find [CRUD operations](#CRUD-Operations) with an `on the fly created repository` using a [singleton connection strategy](#Singleton-Connection-Strategy) and closing the singleton connection at the end with [Async Functions](#Repository-Operations-With-Await). Be sure that your [node.js](http://nodejs.org/) version supports them [(see)](#Repository-Operations-With-Await).
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const config = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: true // singleton connection strategy
}

OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config).loadModel({ 
    Person: {
        firstName: String,
        secondName: String,
    }
})


async function f(){ // define an async function
    try {
        let ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config).update({
            query: {
                firstName: "Marcus",
                secondName: "Fenix"
            },
            update: {
                firstName: "Cole"
            }
        });
        console.log("update ok")
        console.log(ret)

        ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config).find({
            query: {
                firstName: "Cole"
            }
        });
        console.log("find ok")
        console.log(ret)
        
        ret = await OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config).closeSingletonConnection();
        console.log("connection closed")

    } catch (e) {
        console.log("error")
        console.log(e)
    } finally {
        console.log("method ended")
    }

}

f(); // call the async function
```
Obviously you can define a variable called repository and use it without generationg a new one every time. Ih this case should be the best approach because the same repository type is used sequentialy in the function, but in general if you are going to use the same repository in different part of the code it is more clean to generate a new one every time and not to store it in a variable.

Below the new code:
```javascript
const OnTheFlyRepositoryFactory = require('mongodb-repository-wmf').OnTheFlyRepositoryFactory;

const config = {
    url: 'mongodb://localhost/test', // user your connection string
    schemaName: 'Person', // schema name
    singleton: true // singleton connection strategy
}

OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config).loadModel({
    Person: {
        firstName: String,
        secondName: String,
    }
})

async function f(){ // define an async function
    try {

        let repository = OnTheFlyRepositoryFactory.generateOnTheFlyRepository(config); // store the generated repository in a variable

        let ret = await repository.update({
            query: {
                firstName: "Marcus",
                secondName: "Fenix"
            },
            update: {
                firstName: "Cole"
            }
        });
        console.log("update ok")
        console.log(ret)

        ret = await repository.find({
            query: {
                firstName: "Cole"
            }
        });
        console.log("find ok")
        console.log(ret)
        
        ret = await repository.closeSingletonConnection();
        console.log("connection closed")

    } catch (e) {
        console.log("error")
        console.log(e)
    } finally {
        console.log("method ended")
    }

}

f(); // call the async function
```
##### Multiple Operations on the same schema using the same connection strategy
See how to perform an update and a find [CRUD operations](#CRUD-Operations) with an `on the fly created repository` using a [singleton connection strategy](#Singleton-Connection-Strategy) and closing the singleton connection at the end.
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
The same works with the [prototype connection strategy](#Prototype-Connection-Strategy).
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
See how to perform an update and a find [CRUD operations](#CRUD-Operations) on the same schema with different `connection strategies`(see [Prototype Connection Strategy](#Prototype-Connection-Strategy) and [Singleton Connection Strategy)](#Singleton-Connection-Strategy).
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
Let see how to perform different [CRUD operations](#CRUD-Operations) to different schemas using different `connection strategies`(see [Prototype Connection Strategy](#Prototype-Connection-Strategy) and [Singleton Connection Strategy)](#Singleton-Connection-Strategy).
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
## Backward Compatibility
Versions before version 3 are all deprecated. 

The features of these old versions will still works because the backward compatibility is always guaranteed but the new features will not guaranteed for the old version. 

The documentation for these old versions can be found on the deprecated npm package [mongodb-entities](https://www.npmjs.com/package/mongodb-entities).