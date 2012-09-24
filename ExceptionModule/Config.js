define(
    [],
    function(){
        return {
            serviceManager: {
                exceptionController: {
                    moduleName: 'Sds/ExceptionModule/ExceptionController',
                    proxyMethods: [
                        'handle',
                        'get',
                        'set',
                        'watch'
                    ],
                    values: {
                        serverUrl: 'http://localhost/ZendSkeletonApplication/exception/log'
                    },
                    proxyObjects: {
                        exceptionView: 'exceptionView'
                    }
                },
                exceptionView: {
                    moduleName: 'Sds/ExceptionModule/ExceptionView',
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


