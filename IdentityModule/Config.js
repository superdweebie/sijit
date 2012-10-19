define(
    ['Sds/IdentityModule/Smd'],
    function(smd){
        return {
            serviceManager: {
                identityController: {
                    moduleName: 'Sds/IdentityModule/IdentityController',
                    proxyMethods: [
                        'forgotCredential',
                        'forgotCredentialPart1',
                        'forgotCredentialPart2',
                        'register'
                    ],
                    values: {
                        apiSmd: smd,
                        identityRestUrl: '/identity/rest/'
                    },
                    proxyObjects: {
                        forgotCredentialPart1View: 'forgotCredentialPart1View',
                        forgotCredentialPart2View: 'forgotCredentialPart2View',
                        registerView: 'registerView'
                    }
                },
                identity: {
                    moduleName: 'Sds/IdentityModule/DataModel/Identity'
                },
                forgotCredentialPart1View: {
                    moduleName: 'Sds/IdentityModule/View/ForgotCredentialPart1',
                    proxyMethods: [
                        'activate',
                        'reset',
                        'get',
                        'set',
                        'watch'
                    ]
                },
                forgotCredentialPart2View: {
                    moduleName: 'Sds/IdentityModule/View/ForgotCredentialPart2',
                    proxyMethods: [
                        'activate',
                        'reset',
                        'get',
                        'set',
                        'watch'
                    ]
                },
                forgotCredentialPart2ViewModel: {
                    moduleName: 'Sds/IdentityModule/ViewModel/ForgotCredentialPart2'
                },
                registerView: {
                    moduleName: 'Sds/IdentityModule/View/Register',
                    proxyMethods: [
                        'activate',
                        'reset',
                        'get',
                        'set',
                        'watch'
                    ]
                },
                identityNameAvailableValidator: {
                    moduleName: 'Sds/IdentityModule/Validator/IdentityNameAvailableValidator',
                    values: {
                        apiSmd: smd
                    }
                }
            }
        }
    }
);


