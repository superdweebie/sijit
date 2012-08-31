define(
    [],
    function(){
        return {
            serviceManager: {
                exceptionManager: {
                    moduleName: 'Sds/ExceptionManager/ExceptionManager',
                    proxyMethods: [
                        'handle',
                        'get',
                        'set',
                        'watch'
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
                    proxyMethods: [
                        'activate',
                        'reset',
                        'get',
                        'set',
                        'watch'
                    ]
                }
            }
        }
    }
);


