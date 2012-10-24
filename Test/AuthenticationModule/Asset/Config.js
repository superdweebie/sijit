define([], function(){
    return {
        serviceManager: {
            'Sds/AuthenticationModule/AuthenticationController': {
                getObjects: {
                    api: 'mockAuthenticationApi'
                },
                proxyObjects: {
                    loginView: 'mockLoginView'
                }
            },
            'Sds/AuthenticationModule/View/Login': {
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
            'Sds/ExceptionModule/ExceptionController': {
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


