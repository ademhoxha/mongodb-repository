import { RepositoryUtils } from "../utils/repositoryUtils";

class MongoModel {

    private static schema: any = {};

    setModel(inputSchema: any) {
        if (RepositoryUtils.isValidQueryUpdateObject(inputSchema))
            MongoModel.schema = Object.assign(MongoModel.schema, inputSchema);
    }
    getSchemaJson(schemaName: string) {
        if(!schemaName || typeof schemaName != "string")
            return undefined;
        return MongoModel.schema[schemaName];
    }
}

export const Model = new MongoModel();
