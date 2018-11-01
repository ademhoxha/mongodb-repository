
var schema = {}

class Models {

    setModel(inputSchema){
        schema = inputSchema;
    }

    getSchemaJson(schemaName) {
        return schema[schemaName];

    }
}

var istance = new Models();

module.exports = {
    Models: istance
}