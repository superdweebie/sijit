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
            fields: [
                {
                    id       : 'usernameInput',
                    property : 'username',
                    title    : 'Username:',
                    dataType : 'string',
                    required : true,
                    validator: 'Sds/Validator/UsernameValidator'
                },
                {
                    id       : 'password',
                    property : 'password',
                    title    : 'Password:',
                    dataType : 'string',
                    type     : 'password',
                    required : true,
                    validator: 'Sds/AuthModule/Validator/LoginPasswordValidator'
                }
            ]
        };

        return model;
    }
);
