define(
    [],
    function(){
        return {
            serviceManager: {
                exceptionManager: {
                    moduleName: 'Sds/ExceptionManager/ExceptionController',
                    plugins: [
                        'Sds/ServiceManager/Plugin/ExceptionManager'
                    ],
                    asyncObj: {
                        exceptionInputAgent: 'exceptionInputAgent'
                    }
                },
                exceptionInputAgent: {
                    moduleName: 'Sds/ExceptionManger/ExceptionInputAgent',
                    plugins: [
                        'Sds/ServiceManager/Plugin/InputAgent'
                    ]
                }
            }
        }
    }
);


