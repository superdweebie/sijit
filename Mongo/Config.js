define(
    [],
    function(){
        return {
            serviceManager: {
                'Sds/ExceptionModule/ExceptionController': {
                    values: {
                        registeredExceptions: {
                            'Sds/Mongo/Exception/MongoConnectionException': 'MongoConnectionException'
                        }
                    }
                }
            }
        }
    }
);


