var MongooseSingletonProxy = require('./mongooseSingletonProxy').MongooseSingletonProxy;
var MongoosePrototypeProxy = require('./mongoosePrototypeProxy').MongoosePrototypeProxy;

class MongooseProxyFactory {
    generateProxy(singleton) {
        if (singleton)
            return MongooseSingletonProxy;
        return MongoosePrototypeProxy;
    }
}

var istance = new MongooseProxyFactory();
module.exports = {
    MongooseProxyFactory: istance
}