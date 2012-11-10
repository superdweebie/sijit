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
                    'reset',
                    'get',
                    'set',
                    'watch'
                ]
            },
            'Sds/IdentityModule/View/ForgotCredentialPart2': {
                proxyMethods: [
                    'activate',
                    'reset',
                    'get',
                    'set',
                    'watch'
                ]
            },
            'Sds/IdentityModule/View/Register': {
                proxyMethods: [
                    'activate',
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
                    controllers: {
                        identity: {
                            name: 'Sds/IdentityModule/IdentityController',
                            methods: {
                                register: 'register',
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


