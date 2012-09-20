define(
    [],
    function(){
        return {
            serviceManager: {
                userController: {
                    moduleName: 'Sds/UserModule/UserController',
                    proxyMethods: [
                        'recoverPassword',
                        'register'
                    ],
                    values: {
                        userRestUrl: '/user/rest/'
                    },
                    refObjects: {
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
                }
            }
        }
    }
);


