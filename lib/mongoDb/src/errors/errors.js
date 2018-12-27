class ErrorFactory {
    notSingletonIstance(){
        return Error("Not Singleton Istance");
    }
    notSingletonConnectionOpened(){
        return Error("Not Singleton Connection Was Opened");
    }
}

const istance = new ErrorFactory();
module.exports = {
    ErrorFactory : istance
}