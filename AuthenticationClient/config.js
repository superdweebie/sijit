define([],
function(){
    return {
        moduleManager: {
            'Sds/AuthenticationClient/Store/AuthenticatedIdentity': {
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
                        'authentication': {
                            controller: 'Sds/AuthenticationClient/AuthenticationController',
                            methods: {
                                login: {
                                    enter: 'login',
                                    exit: 'exitLogin'
                                },
                                logout: {
                                    enter: 'logout'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
