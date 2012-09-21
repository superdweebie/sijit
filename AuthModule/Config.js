define(
    ['Sds/AuthModule/Smd'],
    function(smd){
        return {
            serviceManager: {
                authController: {
                    moduleName: 'Sds/AuthModule/AuthController',
                    values: {
                        apiSmd: smd
                    },
                    refObjects: {
                        loginView: 'loginView'
                    }
                },
                loginView: {
                    moduleName: 'Sds/AuthModule/View/Login',
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


