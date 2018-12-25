// set schema into a model
const Models = require('../../models/models').Models;

class MongoosePrototypeSchema {
    constructor(mongoose) {
        this.mongoose = mongoose;
        this.schemaList = {};
    }

    getSchema(schemaName) {
        if (this.schemaList[schemaName])
            return this.schemaList[schemaName];
        else {
            var json = Models.getSchemaJson(schemaName)
            if (json) {
                this.schemaList[schemaName] = this.mongoose.model(schemaName, json);
                return this.schemaList[schemaName];
            } else {
                return new Error('Schema not Found');
            }
        }
    }

}

module.exports = {
    MongoosePrototypeSchema: MongoosePrototypeSchema
}