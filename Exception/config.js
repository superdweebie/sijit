define(
    [],
    function(){
        return {
            moduleManager: {
                'Sds/Exception/Handler': {
                    gets: {
                        consoleLogRenderer: 'Sds/Exception/ConsoleLogRenderer'
                    },
                    proxies: {
                        userNotifyRenderer: {
                            base: 'Sds/Exception/UserNotifyRenderer',
                            proxyMethods: [
                                'render'
                            ]
                        },
                        serverLogRenderer: 'Sds/ExceptionClient/ServerLogRenderer'
                    },
                    proxyMethods: ['set', 'handle']
                }
            }
        }
    }
);


