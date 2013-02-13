define([],
function(){
    return {
        moduleManager: {
            'Sds/Store/storeManager': {
                proxies: {
                    stores: [
                        {
                            base: 'Sds/IdentityModule/DataModel/Identity/JsonRest',
                            proxyMethods: ['get', 'put', 'add', 'remove', 'query'],
                            params: {name: 'Identity'}
                        },
                        {
                            base: 'Sds/IdentityModule/DataModel/ForgotCredentialToken/JsonRest',
                            proxyMethods: ['get', 'put', 'add', 'remove', 'query'],
                            params: {name: 'ForgotCredentialToken'}
                        }
                    ]
                }
            },
            'Sds/IdentityModule/View/ForgotCredentialCreateToken': {
                proxyMethods: [
                    'activate',
                    'deactivate',
                    'get',
                    'set',
                    'watch'
                ]
            },
            'Sds/IdentityModule/View/ForgotCredentialUpdateToken': {
                proxyMethods: [
                    'activate',
                    'deactivate',
                    'get',
                    'set',
                    'watch'
                ]
            },
            'Sds/IdentityModule/View/CreateIdentity': {
                proxyMethods: [
                    'activate',
                    'deactivate',
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


