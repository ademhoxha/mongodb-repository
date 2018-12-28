import { MongooseSingletonProxy } from "./mongooseSingletonProxy";
import { MongoosePrototypeProxy } from "./mongoosePrototypeProxy";

class ProxyFactory {
    generateProxy(singleton: boolean): any {
        if (singleton == true)
            return MongooseSingletonProxy;
        return MongoosePrototypeProxy;
    }
}

export const MongooseProxyFactory: ProxyFactory = new ProxyFactory();
