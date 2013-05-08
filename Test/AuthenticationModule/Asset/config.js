define([], function(){
    return {
        moduleManager: {
            'Sds/AuthenticationModule/AuthenticationController': {
                proxies: {
                    loginView: 'MockLoginView'
                },
                params: {
                    storeName: 'mockAuthStore'
                }
            },
            'MockLoginView': {
                base: 'Sds/Test/AuthenticationModule/Asset/MockLoginView',
                proxyMethods: [
                    'activate',
                    'get',
                    'set',
                    'watch'
                ]
            },
            'Sds/Store/storeManager': {
                proxies: {
                    stores: [
                        {
                            base: 'Sds/Test/AuthenticationModule/Asset/MockAuthenticationStore',
                            proxyMethods: ['get', 'put', 'add', 'remove', 'query'],
                            params: {
                                name: 'mockAuthStore'
                            }
                        }
                    ]
                }
            },
            'Sds/Router/router': {
                params: {
                    routes: {
                        identity: {
                            controller: 'Sds/Test/AuthenticationModule/Asset/MockIdentityController',
                            methods: {
                                register: 'register',
                                forgotCredential: 'forgotCredential'
                            }
                        }
                    }
                }
            }
        }
    }
});


