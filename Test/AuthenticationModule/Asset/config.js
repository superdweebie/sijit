define([], function(){
    return {
        moduleManager: {
            'Sds/AuthenticationModule/AuthenticationController': {
                proxies: {
                    loginView: 'MockLoginView'
                },
                gets: {
                    store: 'Sds/Test/AuthenticationModule/Asset/MockAuthenticationStore'
                }
            },
            MockLoginView: {
                base: 'Sds/Test/AuthenticationModule/Asset/MockLoginView',
                proxyMethods: [
                    'activate',
                    'reset',
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


