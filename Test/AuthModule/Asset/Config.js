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
                        loginInputAgent: 'mockLoginInputAgent'
                    }
                },
                loginInputAgent: {
                    refObjects: {
                        userController: 'mockUserController'
                    }
                },
                mockAuthApi: {
                    moduleName: 'Sds/Test/AuthModule/Asset/MockAuthApi'
                },
                mockLoginInputAgent: {
                    moduleName: 'Sds/Test/AuthModule/Asset/MockLoginInputAgent',
                    proxyMethods: [
                        'activate',
                        'reset',
                        'get',
                        'set',
                        'watch'
                    ]
                },
                exceptionManager: {
                    moduleName: 'Sds/Test/AuthModule/Asset/MockExceptionManager',
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


