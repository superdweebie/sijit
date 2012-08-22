define(
    [],
    function(){
        return {
            serviceManager: {
                userController: {
                    moduleName: 'Sds/UserModule/UserController',
                    values: {
                        userRestUrl: '../../../../../user/rest/'
//                        authApiMap: '../../../../auth'
                    }
                }
            }
        }
    }
);
