define([],
function(){
    return {
        mergeConfigs: [
            'Sds/IdentityModule/DataModel/Identity'
        ],
        moduleManager: {
            'Sds/IdentityModule/IdentityController': {
                params: {
                    identityRestUrl: 'http://mysite.com/identity/',
                    forgotCredentialTokenRestUrl: 'http://mysite.com/forgotCredentialToken'
                }
            },
            'Sds/IdentityModule/View/ForgotCredentialCreateToken': {
                proxyMethods: [
                    'activate',
                    'deactivate',
                    'reset',
                    'get',
                    'set',
                    'watch'
                ]
            },
            'Sds/IdentityModule/View/ForgotCredentialUpdateToken': {
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
                params: {
                    restUrl: 'http://mysite.com/identity/'
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
                                forgotCredential: {
                                    enter: 'forgotCredential',
                                    leave: 'cancelForgotCredential',
                                    onEnterResolveRoute: -1
                                }
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


