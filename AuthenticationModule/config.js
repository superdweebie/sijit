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
            'Sds/AuthenticationModule/Login/IdentityName/Input': {
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
                    validator: 'Sds/AuthenticationModule/Login/IdentityName/validator'
                }
            },
            'Sds/AuthenticationModule/Login/Credential/Input': {
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
                    validator: 'Sds/AuthenticationModule/Login/Credential/validator'
                }
            },
            'Sds/AuthenticationModule/Login/RememberMe/Input': {
                base: 'Sds/Common/Form/Checkbox',
                directives: {
                    declare: true,
                    define: true
                },
                params: {
                    name     : 'rememberMe',
                    label    : 'Remember me:'
                }
            },
            'Sds/AuthenticationModule/Login/IdentityName/validator': {
                base: 'validatorGroup',
                gets: {
                    validators: [
                        'requiredValidator',
                        'identifierValidator'
                    ]
                }
            },
            'Sds/AuthenticationModule/Login/Credential/validator': {
                base: 'validatorGroup',
                gets: {
                    validators: [
                        'requiredValidator',
                        {
                            base: 'lengthValidator',
                            params: {min: 6, max: 40}
                        }
                    ]
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
