define ([], function (){

    return {
        moduleManager: {
            'Test': {
                base: 'Sds/Mvc/BaseModel',
                directives: {
                    declare: true
                },
                params: {
                    fields: [
                        'username',
                        'password'
                    ]
                }
            },
            'Test/Validator': {
                base: 'ModelValidator',
                gets: {
                    validators: [
                        'Test/MultiFieldValidator',
                        'Test/Username/Validator',
                        'Test/Password/Validator'
                    ]
                }
            },
            'Test/MultiFieldValidator': {
                base: 'Sds/Test/ModuleManager/Functional/Asset/MultiFieldValidator'
            },
            'Test/Username/Validator': {
                base: 'ValidatorGroup',
                params: {
                    field: 'username'
                },
                gets: {
                    validators: [
                        'RequiredValidator',
                        {
                            base: 'DatatypeValidator',
                            params: {requiredType: 'string'}
                        },
                        'IdentifierValidator'
                    ]
                }
            },
            'Test/Password/Validator': {
                base: 'ValidatorGroup',
                params: {
                    field: 'password'
                },
                gets: {
                    validators: [
                        'RequiredValidator',
                        {
                            base: 'DatatypeValidator',
                            params: {requiredType: 'string'}
                        },
                        'CredentialValidator'
                    ]
                }
            },
            'Test/Form': {
                base: 'Sds/Form/ValidationForm',
                directives: {
                    declare: true,
                    define: true
                },
                params: {
                    'class': ['form-horizontal']
                },
                gets: {
                    validator: 'Test/MultiFieldValidator',
                    inputs: [
                        'Test/Username/Input',
                        'Test/Password/Input'
                    ]
                }
            },
            'Test/Username/Input': {
                base: 'Sds/Form/ValidationTextBox',
                directives: {
                    declare: true,
                    define: true
                },
                params: {
                    name     : 'username',
                    label    : 'Username:'
                },
                gets: {
                    validator: 'Test/Username/Validator'
                }
            },
            'Test/Password/Input': {
                base: 'Sds/Form/ValidationTextBox',
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
                    validator: 'Test/Password/Validator'
                }
            }
        }
    };
});
