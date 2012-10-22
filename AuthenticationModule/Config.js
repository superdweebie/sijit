define(
    ['Sds/AuthenticationModule/Smd'],
    function(smd){
        return {
            serviceManager: {
                'Sds/AuthenticationModule/AuthenticationController': {
                    moduleName: 'Sds/AuthenticationModule/AuthenticationController',
                    values: {
                        apiSmd: smd,
                        enableRememberMe: true
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
                            'Sds/AuthenticationModule/Exception/AlreadyLoggedInException': 'Sds\\AuthenticationModule\\Exception\\AlreadyLoggedInException',
                            'Sds/AuthenticationModule/Exception/LoginFailedException': 'Sds\\AuthenticationModule\\Exception\\LoginFailedException'
                        }
                    }
                }
            }
        }
    }
);
