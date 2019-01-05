3.1.4 / 2019-01-05
===================
* Feature; openSingletonConnection is now possible, just pass the url and the singleton to true, no schema is needed.

* Updated; `MongoPromiseRepositoryInterface` is now the the new method `openSingletonConnection`.
* Improved; `MongoDBOnTheFlyRepository` implements now the interface `MongoPromiseRepositoryInterface`.
* Updated; `MongoDBOnTheFlyRepository` implements the method `openSingletonConnection`.
* Updated; `BaseMongoRepository` implements the method `openSingletonConnection`.
* Updated; `BaseMongoPromiseRepository` implements the method `openSingletonConnection`.
* Updated; `SecretMongoRepository` implements the method `openSingletonConnection`.
* Updated; `SecretMongoPromiseRepository` implements the method `openSingletonConnection`.
* Updated; `MongooseSingletonProxy` has now the method `openSingletonConnection` to open a singleton connection.
* Fixed; `SecretMongoRepository` bug for undefined parameter forEach in methods `secretDataEncrypt` and `secretDataDecrypt`.
* Updated; `config` with new parameters for test.
* Updated; `advancedConnectionTest.test` with new test cases for open singleton connection.
* Updated; `connection.test` with new test cases for open singleton connection.
* Updated; `README.md` has `openSingletonConnection` reference and `version` reference on the `overview` part.

3.1.3 / 2019-01-01
===================

* Feature; Insert Many is now possible, just passing an array to the insert function and the inserMany operation will be applied.
* Feature; Errors are now returned errors for invalid parameters for repository generation or for invalid query parameters in a CRUD operation when a CRUD operation is invoked.

* Improved; `mongoCRUD` in method `addInMongo` the function `save` is now `insertMany` in case of a vector of elements.
* Added; `repositoryError` is now the custom error type for `mongodb-repository-wmf`.
* Updated; `errorFactory` has now the new errors.
* Improved; `baseMongoRepository` manages these new errors with three methods `checkQueryParameters`, `checkRepositoryParameters` and `isValidInsertManyObject`.
* Improved; `secretMongoRepository` manages these new errors calling `super` methods and a new method `areValidateCryptoParameters` to see if `parameter` is a vector of strings.
* Improved; `baseMongoRepository`now `closeSingletonConnection` close the connection in an more fast way and without needing the `schemaName` parameter.
* Improved; `mongooseSingletonProxy`modified to manage the `closeSingletonConnection` without the `schemaName`.
* Updated; In `connection.test` added the test case for `closeSingletonConnection` without the `schemaName`.
* Added; `repositoryUtils` ina new folder `utils` with method needed for errors check.
* Improved; In `model` the method `getSchemaJson` checks if the input parameter is defined and is a string.
* Improved; In `CTRCrypto` in the `constructor` added the controll to see if `password` is a string and is not empty.
* Updated; `config` with new parameters for test.
* Updated; `secret.test` has now all the new test cases for errors management.
* Updated; `data.test` with new test cases for errors management.
* Updated; `crudOperations.test` as new test cases for insert all and find all.
* Updated; `config` with new parameters for test.
* Updated; `README.md` with `error list`, `insertMany` and `await` examples.
* Updated; `LICENSE` is now valid for the year 2019.

3.1.2 / 2018-12-30
===================

* Improved; `@types/mongoose` is now a dev dependency.
* Improved; `README.md` fixes.

3.1.1 / 2018-12-29
===================

* Added; `mocha` added into dev dependency.
* Improved;  test cases now are written using `mocha`.
* Fixed; `crypto` `Warning` `Warning: Use Cipheriv for counter mode of aes-256-ctr.` is now fixed by substituing `createCipher` and `createDecipher` methods with `createCipheriv` and `createDecipheriv` in `CTRCrypto`.
* Improved; `README.md` is improved in the contributing part.

3.1.0 / 2018-12-29
===================

* Pivot; `mongodb-repository-wmf` is now written in `typescript`.

* Added; `mongoPromiseRepositoryInterface` is the interface that is returned.
* Improved; the `crypto` part is the now a folder and not an indipendent part anymore.
* Added; `oldRepositoryFactory` is the factory that support the version 1 and the version 2.
* Improved; `JSDoc` is now added in `MongoPromiseRepositoryInterface` and in `OnTheFlyRepositoryFactory`.
* Added; `.mongooseSchemaInterface` is added and used thanks to `typescript`.
* Added; `.mongooseProxyInterface` is added and used thanks to `typescript`.
* Fixed; `mongoose` `deprecationwarning` `DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.` is now fixed by using  `deleteMany` in `MongoCRUD`.
* Fixed; the update operation is now done by `updateMany` an not anymore by `findOneAndUpdate` in `MongoCRUD`, so is now an update all.
* Improved; Package Structure.
* Improved; `README.md` now has a card.

3.0.4 / 2018-12-27
===================

* Added; `MongoDBOnTheFlyRepository` class to avoid repository internal methods call.
* Improved;  implementation of `generateOnTheFlyRepository` method added in `OnTheFlyRepositoryFactory` now returns a `MongoDBOnTheFlyRepository`.
* Fixed; `test004` now use a prototype connection strategy.
* Improved; `package.json` License becames `MIT` and some `keywords` added.
* Added; `LICENSE` file.

3.0.3 / 2018-12-27
===================

* Fixed; `BaseMongoRepository` method `closeSingletonConnection` now return an error if the singleton connection is not opened.
* Fixed; `BaseMongoRepository` method `initialize` now uses callback to detect invalid url connection.
* Added;  method `openConnection` added in `MongooseProxyInterface` to use callback in the connection opening.
* Added;  implementation of `openConnection` method added in `MongooseSingletonProxy`.
* Added;  implementation of `openConnection` method added in `MongoosePrototypeProxy`.
* Added; `test005` as multiple connections test example.

3.0.2 / 2018-12-27
===================

* Fixed; `SecretMongoRepository` methods `closeSingletonConnection` and `loadModel` now call the super method.
* Added; `test004` as Secret on the fly repository example.

3.0.1 / 2018-12-26
===================

  * Improved; `README.md` fixed.

3.0.0 / 2018-12-26
===================

  * Pivot; The On The Fly Repository now is the only supported repository, it is easy and fast to use.
  
  * Feature; The On The Fly Repository feature is added.
  * Feature; Now is possible to choose between Singleton or Prototype based Repository.

  * Added; `OnTheFlyRepositoryFactory` is now the only available features from the module.
  * Added; `onTheFlyRepositoryFactory.generateOnFlyRepository` is now the only available Repository.
  * Improved; `BaseMongoRepository.constructor` can now accept `data.url` (`data.dbName` is still valid for backward compatibility).
  * Changed; `mongooseProxy` class is now substitued with `mongoosePrototypeProxy`.
  * Added; `mongooseSingletonProxy` to have a Singleton Proxy.
  * Added; `mongooseProxyFactory` to generate the properly Proxy.
  * Changed; `mongooseSchema` class is now substitued with `mongoosePrototypeSchema`.
  * Added; `mongooseSingletonSchema` to have a Singleton Schema.
  * Added; `schemaFactory` to generate the properly Schema.
  * Deprecated; `PublicDBApi` is now deprecated and `PublicDBApi.generateOnFlyRepository` must be used.
  * Improved; `models` now JSON is updated and not overrided.
  * Fixed; `mongoose` `deprecationwarning` `DeprecationWarning: collection.findAndModify is deprecated.` is now fixed.
  * Added; `errorFactory` is added to generalize the errors.
  * Improved; Package Structure.
  * Added; `test` folder with all the test cases.
  * Updated; `package.json` has `crypto` dependency now.
  * Improved; `README.md`.
  * Added; `History.md`.

2.0.3 / 2018-12-20
===================

  * Fixed; `mongoose` `deprecationwarning` in `MongooseSingletonProxy.constructor` for `connect(this.data.dbName, {useNewUrlParser: true});`.

2.0.2 / 2018-12-20
===================

  * Improved; `README.md` with test cases.

2.0.1 / 2018-12-20
===================

  * Improved; `README.md` with version 2 explanation.

2.0.0 / 2018-12-20
===================

  * Feature; Promise Based Repository are added.

  * Added; Promise Based Repository `BaseMongoPromiseRepository`.
  * Added; Promise Based Repository `SecretMongoPromiseRepository`.
  * Improved; `README.md`.

1.0.1 to 1.1.0 / 2018-02-02
==================

  * Improved; `README.md`.
  * Improved; Package Structure.

1.0.0 / 2018-11-01
==================

  * Initial `mongodb-entities` npm package becomes `mongodb-repository-wmf`.