define([],
function(){
    return {
        moduleManager: {
            'Sds/Store/storeManager': {
                gets: {
                    stores: [
                        'Sds/IdentityModule/DataModel/Identity/JsonRestStore',
                        'Sds/IdentityModule/DataModel/ForgotCredentialToken/JsonRestStore'
                    ]
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
            'Sds/IdentityModule/View/CreateIdentity': {
                proxyMethods: [
                    'activate',
                    'deactivate',
                    'reset',
                    'get',
                    'set',
                    'watch'
                ]
            },
            'Sds/Router/router': {
                params: {
                    routes: {
                        identity: {
                            controller: 'Sds/IdentityModule/IdentityController',
                            methods: {
                                identity: {
                                    enter: 'identity',
                                    leave: 'cancelIdentity',
                                    onEnterResolveRoute: -1
                                },
                                forgotCredentialToken: {
                                    enter: 'forgotCredentialToken',
                                    leave: 'cancelForgotCredentialToken',
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


