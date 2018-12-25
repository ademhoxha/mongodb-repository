const MongoRepository = require('./lib/mongoDb/publicDbAPI/publicDBApi').PublicDBApi;
const OnTheFlyRepositoryFactory = require('./lib/mongoDb/publicDbAPI/onTheFlyRepositoryFactory').OnTheFlyRepositoryFactory;

module.exports = {
    MongoRepository : MongoRepository,
    OnTheFlyRepositoryFactory : OnTheFlyRepositoryFactory
}