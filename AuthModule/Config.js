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
                        loginView: 'loginView'
                    }
                },
                loginView: {
                    moduleName: 'Sds/AuthModule/LoginView',
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


