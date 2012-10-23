define([],
function(){
    return {
        serviceManager: {
            'Sds/IdentityModule/IdentityController': {
                moduleName: 'Sds/IdentityModule/IdentityController',
                proxyMethods: [
                    'forgotCredential',
                    'forgotCredentialPart1',
                    'forgotCredentialPart2',
                    'register'
                ],
                values: {
                    identityRestUrl: '/identity/rest/'
                },
                getObjects: {
                    apiSmd: 'Sds/IdentityModule/Smd'
                },
                proxyObjects: {
                    forgotCredentialPart1View: 'Sds/IdentityModule/View/ForgotCredentialPart1',
                    forgotCredentialPart2View: 'Sds/IdentityModule/View/ForgotCredentialPart2',
                    registerView: 'Sds/IdentityModule/View/Register'
                }
            },
            'Sds/IdentityModule/DataModule/Identity': {
                moduleName: 'Sds/IdentityModule/DataModel/Identity'
            },
            'Sds/IdentityModule/View/ForgotCredentialPart1': {
                moduleName: 'Sds/IdentityModule/View/ForgotCredentialPart1',
                proxyMethods: [
                    'activate',
                    'reset',
                    'get',
                    'set',
                    'watch'
                ]
            },
            'Sds/IdentityModule/View/ForgotCredentialPart2': {
                moduleName: 'Sds/IdentityModule/View/ForgotCredentialPart2',
                proxyMethods: [
                    'activate',
                    'reset',
                    'get',
                    'set',
                    'watch'
                ]
            },
            'Sds/IdentityModule/ViewModel/ForgotCredentialPart2': {
                moduleName: 'Sds/IdentityModule/ViewModel/ForgotCredentialPart2'
            },
            'Sds/IdentityModule/View/Register': {
                moduleName: 'Sds/IdentityModule/View/Register',
                proxyMethods: [
                    'activate',
                    'reset',
                    'get',
                    'set',
                    'watch'
                ]
            },
            'Sds/IdentityModule/Validator/IdentityNameAvailableValidator': {
                moduleName: 'Sds/IdentityModule/Validator/IdentityNameAvailableValidator',
                getObjects: {
                    apiSmd: 'Sds/IdentityModule/Smd'
                }
            }
        }
    }
});


