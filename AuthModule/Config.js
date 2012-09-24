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
                    proxyObjects: {
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
                    proxyObjects: {
                        userController: 'userController'
                    }
                }
            }
        }
    }
);


