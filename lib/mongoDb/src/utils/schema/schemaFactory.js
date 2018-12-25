var MongooseSingletonSchema = require('./mongooseSingletonSchema').MongooseSingletonSchema;
var MongoosePrototypeSchema = require('./mongoosePrototypeSchema').MongoosePrototypeSchema;
class SchemaFactory {
    getSchema(singleton){
        if(singleton)
            return MongooseSingletonSchema;
        return MongoosePrototypeSchema;
    }
}

const istance = new SchemaFactory();
module.exports = {
    SchemaFactory : istance
}