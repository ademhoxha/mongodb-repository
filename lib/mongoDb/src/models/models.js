class Models {
    setModel(inputSchema) {
        Models.schema = Object.assign(Models.schema, inputSchema);
    }
    getSchemaJson(schemaName) {
        return Models.schema[schemaName];
    }
}
Models.schema = {}

const istance = new Models();
module.exports = {
    Models: istance
}