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
                    moduleName: 'Sds/UserModule/Model/User'
                },
                recoverPasswordView: {
                    moduleName: 'Sds/UserModule/RecoverPasswordView'
                },
                registerView: {
                    moduleName: 'Sds/UserModule/RegisterView'
                }
            }
        }
    }
);


