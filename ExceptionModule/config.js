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
                        exceptionView: {
                            base: 'Sds/ExceptionModule/View',
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
        }
    }
);


