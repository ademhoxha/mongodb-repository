import * as factory from './onTheFlyRepositoryFactory'

export const OnTheFlyRepositoryFactory : factory.OnTheFlyRepositoryFactory = factory.istance;

// Backward compatibility version 2 and version 1
import * as oldFactory from './oldRepositoryFactory'
export const MongoRepository : oldFactory.OldRepositoryFactory = oldFactory.istance;