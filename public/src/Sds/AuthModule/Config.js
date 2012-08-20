define(
    ['Sds/AuthModule/Smd'],
    function(authSmd){
        return {
            serviceManager: {
                authController: {
                    moduleName: 'Sds/AuthModule/AuthController',
                    values: {
                        authApiSmd: authSmd
                    },
                    refObjects: {
                        exceptionManager: 'exceptionManager',
                        loginInputAgent: 'loginInputAgent'
                    }
                },
                loginInputAgent: {
                    moduleName: 'Sds/AuthModule/LoginInputAgent',
                    plugins: [
                        'Sds/ServiceManager/Plugin/InputAgent'
                    ],
                    refObjects: {
                        exceptionManager: 'exceptionManager',
                        userController: 'userController'
                    }
                }
            }
        }
    }
);


