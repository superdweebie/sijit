define([],
function(){
    return {
        serviceManager: {
            'Sds/AuthenticationModule/AuthenticationController': {
                values: {
                    enableRememberMe: true
                },
                getObjects: {
                    apiSmd: 'Sds/AuthenticationModule/Smd'
                },
                proxyObjects: {
                    loginView: 'Sds/AuthenticationModule/View/Login'
                }
            },
            'Sds/AuthenticationModule/View/Login': {
                proxyMethods: [
                    'activate',
                    'reset',
                    'get',
                    'set',
                    'watch'
                ],
                values: {
                    forgotCredentialRoute: '/identity/forgotCredential',
                    registerRoute: '/identity/register'
                }
            },
            'Sds/ExceptionModule/ExceptionController': {
                values: {
                    registeredExceptions: {
                        'Sds/AuthenticationModule/Exception/LoginFailedException': 'Sds\\AuthenticationModule\\Exception\\LoginFailedException'
                    }
                }
            },
            'Sds/Router/router': {
                values: {
                    controllers: {
                        'authentication': {
                            name: 'Sds/AuthenticationModule/AuthenticationController',
                            methods: {
                                login: 'login',
                                logout: 'logout'
                            }
                        }
                    }
                }
            }
        }
    }
});
