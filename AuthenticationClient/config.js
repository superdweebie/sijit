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
                    model: 'Sds/IdentityClient/Identity/Model'
                },
                proxyMethods: ['get', 'put', 'add', 'remove', 'query']
            },
            'Sds/AuthenticationClient/AuthenticationController': {
                params: {
                    enableRememberMe: true,
                    storeName: 'AuthenticatedIdentity'
                },
                proxies: {
                    loginForm: 'Sds/AuthenticationClient/Login'
                }
            },
            'Sds/AuthenticationClient/Login': {
                proxyMethods: ['get', 'set', 'show', 'hide']
            },
            'Sds/Store/storeManager': {
                proxies: {
                    stores: [
                        'Sds/AuthenticationClient/Store/AuthenticatedIdentity'
                    ]
                }
            },
            'Sds/Router/router': {
                params: {
                    routes: [
                        {
                            regex: /authentication/,
                            controller: 'Sds/AuthenticationClient/AuthenticationController',
                            defaultMethod: 'login',
                            methods: {
                                login: 'login',
                                logout: 'logout'
                            }
                        }
                    ]
                }
            }
        }
    }
});
