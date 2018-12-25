3.0.0 / 2011-12-27
===================

  * Feature; The On-Fly Repository feature is added.
  * Feature; Now is possible to choose between Singleton or Prototype based Repository.

  * Added; `PublicDBApi.generateOnFlyRepository` is now the only available Repository.
  * Improved; `BaseMongoRepository.constructor` can now accept `data.url` (`data.dbName` is still valid for backward compatibility).
  * Changed; `mongooseProxy` class is now substitued with `mongoosePrototypeProxy`.
  * Added; `mongooseSingletonProxy` to have a Singleton Proxy.
  * Added; `mongooseProxyFactory` to generate the properly Proxy.
  * Changed; `mongooseSchema` class is now substitued with `mongoosePrototypeSchema`.
  * Added; `mongooseSingletonSchema` to have a Singleton Schema.
  * Added; `schemaFactory` to generate the properly Schema.
  * Deprecated; `PublicDBApi.getBaseMongoRepository` is now deprecated and `PublicDBApi.generateOnFlyRepository` must be used.
  * Deprecated; `PublicDBApi.getSecretMongoRepository` is now deprecated and `PublicDBApi.generateOnFlyRepository` must be used.
  * Deprecated; `PublicDBApi.getBaseMongoPromiseRepository` is now deprecated and `PublicDBApi.generateOnFlyRepository` must be used.
  * Deprecated; `PublicDBApi.getSecretMongoPromiseRepository` is now deprecated and `PublicDBApi.generateOnFlyRepository` must be used.
  * Improved;  `models` now JSON is updated and not overrided.
  * Added; `errorFactory` is added to generalize the errors.
  * Improved; Package Structure.
  * Added; `test` folder with all the test cases.
  * Updated; `package.json` has `crypto` dependency now.
  * Improved; `README.md`.

2.0.3 / 2011-12-20
===================

  * Fixed; `mongoose` `deprecationwarning` in `MongooseSingletonProxy.constructor` for `connect(this.data.dbName, {useNewUrlParser: true});`.

2.0.2 / 2011-12-20
===================

  * Improved; `README.md` with test cases.

2.0.1 / 2011-12-20
===================

  * Improved; `README.md` with version 2 explanation.

2.0.0 / 2011-12-20
===================

  * Feature; Promise Based Repository are added.

  * Added; Promise Based Repository `BaseMongoPromiseRepository`.
  * Added; Promise Based Repository `SecretMongoPromiseRepository`.
  * Improved; `README.md`.

1.0.1 - 1.1.0 / 2011-02-02
==================

  * Improved; `README.md`.
  * Improved; Package Structure.

1.0.0 / 2011-11-01
==================

  * Init mongodb-entities npm package becomes mongodb-repository-wmf.