define([],
function(){
    return {
        mergeConfigs: [
            'Sds/IdentityModule/DataModel/Identity'
        ],
        moduleManager: {
            'Sds/IdentityModule/IdentityController': {
                proxyMethods: [
                    'forgotCredential',
                    'forgotCredentialPart1',
                    'forgotCredentialPart2',
                    'register'
                ],
                params: {
                    identityRestUrl: '/identity/rest/'
                },
                gets: {
                    apiSmd: 'Sds/IdentityModule/Smd'
                },
                proxies: {
                    forgotCredentialPart1View: 'Sds/IdentityModule/View/ForgotCredentialPart1',
                    forgotCredentialPart2View: 'Sds/IdentityModule/View/ForgotCredentialPart2',
                    registerView: 'Sds/IdentityModule/View/Register'
                }
            },
            'Sds/IdentityModule/View/ForgotCredentialPart1': {
                proxyMethods: [
                    'activate',
                    'deactivate',
                    'reset',
                    'get',
                    'set',
                    'watch'
                ]
            },
            'Sds/IdentityModule/View/ForgotCredentialPart2': {
                proxyMethods: [
                    'activate',
                    'deactivate',
                    'reset',
                    'get',
                    'set',
                    'watch'
                ]
            },
            'Sds/IdentityModule/View/Register': {
                proxyMethods: [
                    'activate',
                    'deactivate',
                    'reset',
                    'get',
                    'set',
                    'watch'
                ]
            },
            'Sds/IdentityModule/Validator/IdentityNameAvailableValidator': {
                gets: {
                    apiSmd: 'Sds/IdentityModule/Smd'
                }
            },
            'Sds/Router/router': {
                params: {
                    routes: {
                        identity: {
                            controller: 'Sds/IdentityModule/IdentityController',
                            methods: {
                                register: {
                                    enter: 'register',
                                    leave: 'cancelRegister',
                                    onEnterResolveRoute: -1
                                },
                                forgotCredential: 'forgotCredential',
                                forgotCredentialPart1: 'forgotCredentialPart1',
                                forgotCredentailPart2: 'forgotCredentialPart2'
                            }
                        }
                    }
                }
            },
            'Sds/ExceptionModule/ExceptionController': {
                params: {
                    registeredExceptions: {
                        'Sds/IdentityModule/Exception/InvalidArgumentException': 'Sds\\IdentityModule\\Exception\\InvalidArgumentException'
                    }
                }
            }
        }
    }
});


