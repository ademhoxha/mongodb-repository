// set schema into a model
const models = require('../models/models').Models;

class mongooseSchema {
    constructor(mongoose) {
        this.mongoose = mongoose;
        this.schemaList = {};
    }

    getSchema(schemaName) {
        if (this.schemaList[schemaName])
            return this.schemaList[schemaName];
        else {
            var json = models.getSchemaJson(schemaName)
            if (json) {
                this.schemaList[schemaName] = this.mongoose.model(schemaName, json);
                return this.schemaList[schemaName];
            }
            else {
                return new Error('Schema not Found');
            }
        }
    }

}

module.exports = {
    mongooseSchema : mongooseSchema
}