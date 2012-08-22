define(
    [],
    function(){
        return {
            serviceManager: {
                userController: {
                    moduleName: 'Sds/UserModule/UserController',
                    values: {
                        userRestUrl: '/user/rest/'
//                        userApiMap: '../../../../auth'
                    },
                    refObjects: {
                        status: 'status',
                        exceptionManager: 'exceptionManager',
                        recoverPasswordInputAgent: 'Sds/UserModule/RecoverPasswordInputAgent',
                        registerInputAgent: 'Sds/UserModule/RegisterInputAgent'
                    }
                },
                user: {
                    moduleName: 'Sds/UserModule/Model/User'
                }
            }
        }
    }
);


