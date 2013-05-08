define( [],
function(){
    return {
        moduleManager: {
            'Sds/ExceptionClient/ServerLogRenderer': {
                proxyMethods: [
                    'render'
                ]
            },
            'Sds/Store/storeManager': {
                proxies: {
                    stores: [
                        {
                            base: 'Sds/ExceptionClient/DataModel/Exception/JsonRest',
                            proxyMethods: ['get', 'put', 'add', 'remove', 'query'],
                            params: {name: 'Exception'}
                        }
                    ]
                }
            }
        }
    }
});


