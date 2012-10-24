define(
    [],
    function(){
        return {
            serviceManager: {
                'Sds/ExceptionModule/ExceptionController': {
                    proxyMethods: [
                        'handle',
                        'standardize',
                        'get',
                        'set',
                        'watch'
                    ],
                    values: {
                        serverUrl: 'http://localhost/ZendSkeletonApplication/exception/log',
                        registeredExceptions: {}
                    },
                    proxyObjects: {
                        exceptionView: 'Sds/ExceptionModule/View/Exception'
                    }
                },
                'Sds/ExceptionModule/View/Exception': {
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


