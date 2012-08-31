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
                        recoverPasswordInputAgent: 'recoverPasswordInputAgent',
                        registerInputAgent: 'registerInputAgent'
                    }
                },
                user: {
                    moduleName: 'Sds/UserModule/Model/User'
                },
                recoverPasswordInputAgent: {
                    moduleName: 'Sds/UserModule/RecoverPasswordInputAgent'
                },
                registerInputAgent: {
                    moduleName: 'Sds/UserModule/RegisterInputAgent'
                }
            }
        }
    }
);


