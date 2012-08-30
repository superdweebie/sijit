define(
    [],
    function(){
        return {
            serviceManager: {
                userController: {
                    moduleName: 'Sds/UserModule/UserController',
                    plugins: [
                        'Sds/ServiceManager/Plugin/UserController'
                    ],
                    values: {
                        userRestUrl: '/user/rest/'
                    },
                    refObjects: {
                        status: 'status',
                        exceptionManager: 'exceptionManager',
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


