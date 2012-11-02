define([],
function(){
    return {
        moduleManager: {
            'Sds/AuthenticationModule/AuthenticationController': {
                params: {
                    enableRememberMe: true
                },
                gets: {
                    apiSmd: 'Sds/AuthenticationModule/Smd'
                },
                proxies: {
                    loginView: 'Sds/AuthenticationModule/View/Login'
                }
            },
            'Sds/AuthenticationModule/View/Login': {
                proxyMethods: [
                    'activate',
                    'reset',
                    'get',
                    'set',
                    'watch'
                ],
                params: {
                    forgotCredentialRoute: '/identity/forgotCredential',
                    registerRoute: '/identity/register'
                }
            },
            'Sds/AuthenticationModule/ViewModel/Login': {
                base: {},
                params: {
                    identityName: undefined,
                    credential: undefined
                }
            },
            'Sds/AuthenticationModule/ViewModel/Login/IdentityName/Input': {
                base: 'Sds/Common/Form/ValidationTextBox',
                directives: {
                    declare: true,
                    define: true
                },
                params: {
                    name     : 'identityName',
                    label    : 'Username:'
                },
                gets: {
                    validator: 'Sds/AuthenticationModule/ViewModel/Login/IdentityName/validator'
                }
            },
            'Sds/AuthenticationModule/ViewModel/Login/Credential/Input': {
                base: 'Sds/Common/Form/ValidationTextBox',
                directives: {
                    declare: true,
                    define: true
                },
                params: {
                    name     : 'credential',
                    label    : 'Password:',
                    type     : 'password'
                },
                gets: {
                    validator: 'Sds/AuthenticationModule/ViewModel/Login/Credential/validator'
                }
            },
            'Sds/AuthenticationModule/ViewModel/Login/RememberMe/Input': {
                base: 'Sds/Common/Form/Checkbox',
                directives: {
                    declare: true,
                    define: true
                },
                params: {
                    name     : 'rememberMe',
                    label    : 'Remember me:'
                },
                gets: {
                    validator: 'Sds/AuthenticationModule/ViewModel/Login/RememberMe/validator'
                }
            },


            'Sds/ExceptionModule/ExceptionController': {
                params: {
                    registeredExceptions: {
                        'Sds/AuthenticationModule/Exception/LoginFailedException': 'Sds\\AuthenticationModule\\Exception\\LoginFailedException'
                    }
                }
            },
            'Sds/Router/router': {
                params: {
                    controllers: {
                        'authentication': {
                            name: 'Sds/AuthenticationModule/AuthenticationController',
                            methods: {
                                login: 'login',
                                logout: 'logout'
                            }
                        }
                    }
                }
            }
        }
    }
});
