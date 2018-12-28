import { MongooseSingletonSchema } from "./mongooseSingletonSchema";
import { MongoosePrototypeSchema } from "./mongoosePrototypeSchema";

class Factory {
    getSchema(singleton: boolean) {
        if (singleton)
            return MongooseSingletonSchema;
        return MongoosePrototypeSchema;
    }
}

export const SchemaFactory: Factory = new Factory();