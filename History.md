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