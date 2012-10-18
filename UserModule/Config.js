define(
    ['Sds/UserModule/Smd'],
    function(smd){
        return {
            serviceManager: {
                userController: {
                    moduleName: 'Sds/UserModule/UserController',
                    proxyMethods: [
                        'recoverPasswordPart1',
                        'recoverPasswordPart2',
                        'register'
                    ],
                    values: {
                        apiSmd: smd,
                        userRestUrl: '/user/rest/'
                    },
                    proxyObjects: {
                        status: 'status',
                        recoverPasswordPart1View: 'recoverPasswordPart1View',
                        recoverPasswordPart2View: 'recoverPasswordPart2View',
                        registerView: 'registerView'
                    }
                },
                user: {
                    moduleName: 'Sds/UserModule/DataModel/User'
                },
                recoverPasswordPart1View: {
                    moduleName: 'Sds/UserModule/View/RecoverPasswordPart1',
                    proxyMethods: [
                        'activate',
                        'reset',
                        'get',
                        'set',
                        'watch'
                    ]
                },
                recoverPasswordPart2View: {
                    moduleName: 'Sds/UserModule/View/RecoverPasswordPart2',
                    proxyMethods: [
                        'activate',
                        'reset',
                        'get',
                        'set',
                        'watch'
                    ]
                },
                recoverPasswordPart2ViewModel: {
                    moduleName: 'Sds/UserModule/ViewModel/RecoverPasswordPart2'
                },
                registerView: {
                    moduleName: 'Sds/UserModule/View/Register',
                    proxyMethods: [
                        'activate',
                        'reset',
                        'get',
                        'set',
                        'watch'
                    ]
                },
                usernameAvailableValidator: {
                    moduleName: 'Sds/UserModule/Validator/UsernameAvailableValidator',
                    values: {
                        apiSmd: smd
                    }
                }
            }
        }
    }
);


