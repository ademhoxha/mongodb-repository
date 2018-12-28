class MongoModel {

    private static schema : any = {};

    setModel(inputSchema : any) {
        MongoModel.schema = Object.assign(MongoModel.schema, inputSchema);
    }
    getSchemaJson(schemaName : string) {
        return MongoModel.schema[schemaName];
    }
}

export const Model = new MongoModel();
