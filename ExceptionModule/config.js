define(
    [],
    function(){
        return {
            moduleManager: {
                'Sds/ExceptionModule/ExceptionController': {
                    proxyMethods: [
                        'handle',
                        'standardize',
                        'get',
                        'set',
                        'watch'
                    ],
                    params: {
                        serverUrl: 'http://localhost/ZendSkeletonApplication/exception/log',
                        registeredExceptions: {}
                    },
                    proxies: {
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


