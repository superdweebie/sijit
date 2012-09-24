define(
    ['Sds/UserModule/Smd'],
    function(smd){
        return {
            serviceManager: {
                userController: {
                    moduleName: 'Sds/UserModule/UserController',
                    proxyMethods: [
                        'recoverPassword',
                        'register'
                    ],
                    values: {
                        apiSmd: smd,
                        userRestUrl: '/user/rest/'
                    },
                    proxyObjects: {
                        status: 'status',
                        recoverPasswordView: 'recoverPasswordView',
                        registerView: 'registerView'
                    }
                },
                user: {
                    moduleName: 'Sds/UserModule/DataModel/User'
                },
                recoverPasswordView: {
                    moduleName: 'Sds/UserModule/View/RecoverPassword'
                },
                registerView: {
                    moduleName: 'Sds/UserModule/View/Register'
                },
                usernameAvailableValidator: {
                    values: {
                        apiSmd: smd
                    }
                }
            }
        }
    }
);


