class ErrorFactory {
    notSingletonIstance(){
        return Error("Not Singleton Istance");
    }
}

const istance = new ErrorFactory();
module.exports = {
    ErrorFactory : istance
}