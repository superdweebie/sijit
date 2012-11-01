define ([], function (){

    return {
        testForm: {
            mid: 'Sds/Common/Form/ValidationForm',
            params: {
                'class': ['form-horizontal']
            },
            gets: {
                validator: 'Sds/Test/Common/Form/Asset/FormValidator',
                fields: [
                    'usernameField',
                    'passwordField'
                ]
            }
        },
        usernameField: {
            mid: 'Sds/Common/Form/ValidationTextBox',
            params: {
                id       : 'testUsername',
                property : 'username'
            },
            gets: {
                validator: [
                    'Sds/Common/Validator/RequiredValidator',
                    {
                        mid: 'Sds/Common/Validator/DatatypeValidator',
                        params: {requiredType: 'string'}
                    },
                    'Sds/Common/Validator/IdentifierValidator'
                ]
            }
        },
        passwordField: {
            mid: 'Sds/Common/Form/ValidationTextBox',
            params: {
                id       : 'testPassword',
                property : 'password',
                label    : 'Password:',
                type     : 'password'
            },
            gets: {
                validator: [
                    'Sds/Common/Validator/RequiredValidator',
                    {
                        mid: 'Sds/Common/Validator/DatatypeValidator',
                        params: {requiredType: 'string'}
                    },
                    'Sds/Common/Validator/CredentialValidator'
                ]
            }
        }
    };
});
