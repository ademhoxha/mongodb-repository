export interface MongooseSchemaInterface {

    getSchema(schemaName : any) : any;

    connectionClosed() : void;
}
