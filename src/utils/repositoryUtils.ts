export class RepositoryUtils {

    static isValidInsertManyObject(obj: any): boolean {
        var b: boolean = true;
        if (!obj || !(obj instanceof Array))
            return false;
        if(obj.length < 1)
            return false;
        obj.forEach(e => {
            if(!this.isValidQueryUpdateObject(e) || !this.isValidQueryUpdateObject(e.query))
                b = false;
        })
        return b;
    }

    static isValidQueryUpdateObject(obj: any): boolean {
        if (!obj || typeof obj != 'object' || !(obj instanceof {}.constructor))
            return false;
        return true;
    }

    static isValidRepositoryConfigString(obj: any): boolean {
        if (!obj || typeof obj != 'string' || obj.trim() == "")
            return false;
        return true;
    }

    static isValidSingletonConfigParameter(obj: any): boolean {
        if (obj && typeof obj != 'boolean')
            return false;
        return true;
    }

    static areValidateCryptoParameters(obj: any): boolean {
        var b = true;
        if (obj && !(obj instanceof Array))
            b = false;
        else if (obj && obj instanceof Array) {
            obj.forEach(element => {
                if (!element || typeof element != 'string')
                    b = false;
            });
        }
        return b;
    }

}