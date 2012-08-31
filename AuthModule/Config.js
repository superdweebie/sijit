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
                        loginInputAgent: 'loginInputAgent'
                    }
                },
                loginInputAgent: {
                    moduleName: 'Sds/AuthModule/LoginInputAgent',
                    proxyMethods: [
                        'activate',
                        'reset',
                        'get',
                        'set',
                        'watch'
                    ],
                    refObjects: {
                        userController: 'userController'
                    }
                }
            }
        }
    }
);


