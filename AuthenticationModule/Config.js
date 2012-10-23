define([],
function(){
    return {
        serviceManager: {
            'Sds/AuthenticationModule/AuthenticationController': {
                moduleName: 'Sds/AuthenticationModule/AuthenticationController',
                values: {
                    enableRememberMe: true
                },
                getObjects: {
                    apiSmd: 'Sds/AuthenticationModule/Smd'
                },
                proxyObjects: {
                    loginView: 'Sds/AuthenticationModule/LoginView'
                }
            },
            'Sds/AuthenticationModule/LoginView': {
                moduleName: 'Sds/AuthenticationModule/View/Login',
                proxyMethods: [
                    'activate',
                    'reset',
                    'get',
                    'set',
                    'watch'
                ],
                proxyObjects: {
                    identityController: 'Sds/IdentityModule/IdentityController'
                }
            },
            'Sds/ExceptionModule/ExceptionController': {
                values: {
                    registeredExceptions: {
                        'Sds/AuthenticationModule/Exception/LoginFailedException': 'Sds\\AuthenticationModule\\Exception\\LoginFailedException'
                    }
                }
            }
        }
    }
});
