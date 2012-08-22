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
                        loginInputAgent: 'mockLoginInputAgent',
                        exceptionManager: 'mockExceptionManager'
                    }
                },
                loginInputAgent: {
                    refObjects: {
                        userController: 'mockUserController',
                        exceptionManager: 'mockExceptionManager'
                    }
                },
                mockAuthApi: {
                    moduleName: 'Sds/Test/AuthModule/Asset/MockAuthApi'
                },
                mockLoginInputAgent: {
                    moduleName: 'Sds/Test/AuthModule/Asset/MockLoginInputAgent',
                    plugins: [
                        'Sds/ServiceManager/Plugin/InputAgent'
                    ]
                },
                mockExceptionManager: {
                    moduleName: 'Sds/Test/AuthModule/Asset/MockExceptionManager',
                    plugins: [
                        'Sds/ServiceManager/Plugin/ExceptionManager'
                    ]
                },
                mockUserController: {
                    moduleName: 'Sds/Test/AuthModule/Asset/MockUserController'
                }
            }
        }
    }
);


