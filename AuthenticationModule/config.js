define([],
function(){
    return {
        moduleManager: {
            'Sds/AuthenticationModule/AuthenticationController': {
                params: {
                    enableRememberMe: true,
                    restUrl: 'http://mysite.com/authenticatedIdentity/'
                },
                proxies: {
                    loginView: 'Sds/AuthenticationModule/View/Login'
                }
            },
            'Sds/AuthenticationModule/View/Login': {
                proxyMethods: [
                    'activate',
                    'deactivate',
                    'reset',
                    'get',
                    'set',
                    'watch'
                ]
            },
            'Sds/AuthenticationModule/Login/IdentityName/Input': {
                base: 'Sds/Form/ValidationTextBox',
                directives: {
                    declare: true,
                    define: true
                },
                params: {
                    name     : 'identityName',
                    label    : 'Username:'
                },
                gets: {
                    validator: 'Sds/AuthenticationModule/Login/IdentityName/Validator'
                }
            },
            'Sds/AuthenticationModule/Login/Credential/Input': {
                base: 'Sds/Form/ValidationTextBox',
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
                    validator: 'Sds/AuthenticationModule/Login/Credential/Validator'
                }
            },
            'Sds/AuthenticationModule/Login/RememberMe/Input': {
                base: 'Sds/Form/Checkbox',
                directives: {
                    declare: true,
                    define: true
                },
                params: {
                    name     : 'rememberMe',
                    label    : 'Remember me:'
                }
            },
            'Sds/AuthenticationModule/Login/IdentityName/Validator': {
                base: 'ValidatorGroup',
                gets: {
                    validators: [
                        'RequiredValidator',
                        'IdentifierValidator'
                    ]
                }
            },
            'Sds/AuthenticationModule/Login/Credential/Validator': {
                base: 'ValidatorGroup',
                gets: {
                    validators: [
                        'RequiredValidator',
                        {
                            base: 'LengthValidator',
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
                    routes: {
                        authentication: {
                            controller: 'Sds/AuthenticationModule/AuthenticationController',
                            methods: {
                                login: {
                                    enter: 'login',
                                    leave: 'cancelLogin',
                                    onEnterResolveRoute: -1
                                },
                                logout: {
                                    enter: 'logout',
                                    onEnterResolveRoute: -1
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
