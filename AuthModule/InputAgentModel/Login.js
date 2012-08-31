define ([
        'dojo/_base/declare',
        'Sds/InputAgent/BaseInputAgentModel'
    ],
    function (
        declare,
        BaseInputAgentModel
    ){
        var model = declare (
            'Sds/AuthModule/InputAgentModel/Login',
            [BaseInputAgentModel],
            {
                username: undefined,
                password: undefined
            }
        );

        model.metadata = {
            fields: {
                username:
                {
                    id       : 'usernameInput',
                    property : 'username',
                    title    : 'Username:',
                    dataType : 'string',
                    required : true,
                    validators: [
                        {
                            module: 'Sds/Validator/IdentifierValidator'
                        }
                    ]
                },
                password:
                {
                    id       : 'password',
                    property : 'password',
                    title    : 'Password:',
                    dataType : 'string',
                    type     : 'password',
                    required : true,
                    validators: [
                        {
                            module: 'Sds/Validator/LengthValidator',
                            options: {min: 6, max: 40}
                        }
                    ]
                }
            }
        };

        return model;
    }
);
