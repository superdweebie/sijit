define(
    [],
    function(){
        return {
            serviceManager: {
                authController: {
                    moduleName: 'Sds/AuthModule/AuthController',
                    getObjects: {
                        authApi: 'mockAuthApi'
                    },
                    refObjects: {
                        loginView: 'mockLoginView'
                    }
                },
                loginView: {
                    refObjects: {
                        userController: 'mockUserController'
                    }
                },
                mockAuthApi: {
                    moduleName: 'Sds/Test/AuthModule/Asset/MockAuthApi'
                },
                mockLoginView: {
                    moduleName: 'Sds/Test/AuthModule/Asset/MockLoginView',
                    proxyMethods: [
                        'activate',
                        'reset',
                        'get',
                        'set',
                        'watch'
                    ]
                },
                exceptionController: {
                    moduleName: 'Sds/Test/AuthModule/Asset/MockExceptionController',
                    proxyMethods: [
                        'handle'
                    ]
                },
                mockUserController: {
                    moduleName: 'Sds/Test/AuthModule/Asset/MockUserController',
                    proxyMethods: [
                        'recoverPassword',
                        'register'
                    ]
                }
            }
        }
    }
);


