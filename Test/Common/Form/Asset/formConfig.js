define ([], function (){

    return {
        'class' : ['form-horizontal'],
        validator : {
            'class': 'Sds/Test/Common/Form/Asset/FormValidator',
            options: null
        },
        fields: {
            username:
            {
                id       : 'testUsername',
                property : 'username',
                dataType : 'string',
                required : true,
                validator: {
                    'class' : 'Sds/Common/Validator/IdentifierValidator',
                    options: null
                }
            },
            password:
            {
                id       : 'testPassword',
                property : 'password',
                label    : 'Password:',
                dataType : 'string',
                type     : 'password',
                required : true,
                validator: {
                    'class' : 'Sds/Common/Validator/CredentialValidator',
                    options: null
                }
            }
        }
    };
});
