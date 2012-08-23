define(
    [],
    function(){
        return {
            serviceManager: {
                exceptionManager: {
                    moduleName: 'Sds/ExceptionManager/ExceptionManager',
                    plugins: [
                        'Sds/ServiceManager/Plugin/ExceptionManager'
                    ],
                    values: {
                        serverUrl: 'http://localhost/ZendSkeletonApplication/exception/log'
                    },
                    refObjects: {
                        exceptionInputAgent: 'exceptionInputAgent'
                    }
                },
                exceptionInputAgent: {
                    moduleName: 'Sds/ExceptionManager/ExceptionInputAgent',
                    plugins: [
                        'Sds/ServiceManager/Plugin/InputAgent'
                    ]
                }
            }
        }
    }
);


