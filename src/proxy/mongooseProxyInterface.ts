export interface MongooseProxyInterface {
    getConnection(): any;
    getDb(): any;

    initializeSchema(): any;
    getSchema(): any;

    openConnection(callback: (err: any) => void): any;
    closeConnection(callback: (err: any) => void): any;
}

export const connectionOptions: any = {
    useNewUrlParser: true,
    useFindAndModify: false
}