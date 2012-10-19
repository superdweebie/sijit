define([], function(){
    return {
        serviceManager: {
            authenticationController: {
                getObjects: {
                    api: 'mockAuthenticationApi'
                },
                proxyObjects: {
                    loginView: 'mockLoginView'
                }
            },
            loginView: {
                proxyObjects: {
                    identityController: 'mockIdentityController'
                }
            },
            mockAuthenticationApi: {
                moduleName: 'Sds/Test/AuthenticationModule/Asset/MockAuthenticationApi'
            },
            mockLoginView: {
                moduleName: 'Sds/Test/AuthenticationModule/Asset/MockLoginView',
                proxyMethods: [
                    'activate',
                    'reset',
                    'get',
                    'set',
                    'watch'
                ]
            },
            exceptionController: {
                moduleName: 'Sds/Test/AuthenticationModule/Asset/MockExceptionController',
                proxyMethods: [
                    'handle'
                ]
            },
            mockIdentityController: {
                moduleName: 'Sds/Test/AuthenticationModule/Asset/MockIdentityController',
                proxyMethods: [
                    'forgotCredential',
                    'register'
                ]
            }
        }
    }
});


