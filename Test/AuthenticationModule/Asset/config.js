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
            MockLoginView: {
                base: 'Sds/Test/AuthenticationModule/Asset/MockLoginView',
                proxyMethods: [
                    'activate',
                    'get',
                    'set',
                    'watch'
                ]
            },
            'Sds/Test/AuthenticationModule/Asset/MockIdentityController': {
                base: {},
                params: {
                    register: function(){console.debug('register')},
                    forgotCredential: function(){console.debug('forgotCredential')}
                }
            },
            'Sds/Store/storeManager': {
                gets: {
                    stores: [
                        'Sds/Test/AuthenticationModule/Asset/MockAuthenticationStore'
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


