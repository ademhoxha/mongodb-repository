class Factory {
    notSingletonIstance() : Error{
        return Error("Not Singleton Istance");
    }
    notSingletonConnectionOpened() : Error{
        return Error("Not Singleton Connection Was Opened");
    }
}

export const ErrorFactory : Factory = new Factory();