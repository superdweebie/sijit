define(
    [],
    function(){
        return {
            moduleManager: {
                'Sds/ExceptionModule/ExceptionController': {
                    params: {
                        registeredExceptions: {
                            'Sds/Mongo/Exception/MongoConnectionException': 'MongoConnectionException'
                        }
                    }
                }
            }
        }
    }
);


