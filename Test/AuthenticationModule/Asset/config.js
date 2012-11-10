define([], function(){
    return {
        moduleManager: {
            'Sds/AuthenticationModule/AuthenticationController': {
                gets: {
                    api: 'Sds/Test/AuthenticationModule/Asset/MockAuthenticationApi'
                },
                proxies: {
                    loginView: 'mockLoginView'
                }
            },
            mockLoginView: {
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
                    register: function(){},
                    forgotCredential: function(){}
                }
            },
            'Sds/Router/router': {
                params: {
                    controllers: {
                        identity: {
                            name: 'Sds/Test/AuthenticationModule/Asset/MockIdentityController',
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


