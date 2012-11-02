define ([], function (){

    return {
        moduleManager: {
            'Test': {
                base: 'dojo/Stateful',
                directives: {
                    declare: true
                },
                params: {
                    username: undefined,
                    password: undefined,
                    toJSON: function(){
                        return {username: this.username, password: this.password}
                    }
                }
            },
            'Test/validator': {
                base: 'modelValidator',
                gets: {
                    validators: [
                        'Test/multiFieldValidator',
                        'Test/Username/validator',
                        'Test/Password/validator'
                    ]
                }
            },
            'Test/multiFieldValidator': {
                base: 'Sds/Test/ModuleManager/Functional/Asset/MultiFieldValidator'
            },
            'Test/Username/validator': {
                base: 'validatorGroup',
                params: {
                    field: 'username'
                },
                gets: {
                    validators: [
                        'requiredValidator',
                        {
                            base: 'datatypeValidator',
                            params: {requiredType: 'string'}
                        },
                        'identifierValidator'
                    ]
                }
            },
            'Test/Password/validator': {
                base: 'validatorGroup',
                params: {
                    field: 'password'
                },
                gets: {
                    validators: [
                        'requiredValidator',
                        {
                            base: 'datatypeValidator',
                            params: {requiredType: 'string'}
                        },
                        'credentialValidator'
                    ]
                }
            },
            'Test/Form': {
                base: 'Sds/Common/Form/ValidationForm',
                directives: {
                    declare: true,
                    define: true
                },
                params: {
                    'class': ['form-horizontal']
                },
                gets: {
                    validator: 'Test/multiFieldValidator',
                    inputs: [
                        'Test/Username/Input',
                        'Test/Password/Input'
                    ]
                }
            },
            'Test/Username/Input': {
                base: 'Sds/Common/Form/ValidationTextBox',
                directives: {
                    declare: true,
                    define: true
                },
                params: {
                    name     : 'username',
                    label    : 'Username:'
                },
                gets: {
                    validator: 'Test/Username/validator'
                }
            },
            'Test/Password/Input': {
                base: 'Sds/Common/Form/ValidationTextBox',
                directives: {
                    declare: true,
                    define: true
                },
                params: {
                    name     : 'password',
                    label    : 'Password:',
                    type     : 'password'
                },
                gets: {
                    validator: 'Test/Password/validator'
                }
            }
        }
    };
});
