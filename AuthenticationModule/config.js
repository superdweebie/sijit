define([],
function(){
    return {
        moduleManager: {
            'Sds/AuthenticationModule/Store/AuthenticatedIdentity': {
                base: 'Sds/Mvc/JsonRest',
                params: {
                    name: 'AuthenticatedIdentity',
                    idProperty: 'identityName',
                    target: 'http://test.com/authenticatedIdentity'
                },
                gets: {
                    model: 'Sds/IdentityModule/DataModel/Identity'
                },
                proxyMethods: ['get', 'put', 'add', 'remove', 'query']
            },
            'Sds/AuthenticationModule/AuthenticationController': {
                params: {
                    enableRememberMe: true
                },
                proxies: {
                    loginView: 'Sds/AuthenticationModule/View/Login'
                }
            },
            'Sds/Store/storeManager': {
                proxies: {
                    stores: [
                        'Sds/AuthenticationModule/Store/AuthenticatedIdentity'
                    ]
                }
            },
            'Sds/Router/router': {
                params: {
                    routes: {
                        authentication: {
                            controller: 'Sds/AuthenticationModule/AuthenticationController',
                            methods: {
                                login: {
                                    enter: 'login',
                                    leave: 'cancelLogin',
                                    onEnterResolveRoute: -1
                                },
                                logout: {
                                    enter: 'logout',
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
                        'Sds/AuthenticationModule/Exception/LoginFailedException': 'Sds\\AuthenticationModule\\Exception\\LoginFailedException'
                    }
                }
            }
        }
    }
});
