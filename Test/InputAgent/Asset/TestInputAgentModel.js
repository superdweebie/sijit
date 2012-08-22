define ([
        'dojo/_base/declare',
        'Sds/InputAgent/BaseInputAgentModel'
    ],
    function (
        declare,
        BaseInputAgentModel
    ){
        var model = declare (
            'Sds/Test/InputAgent/Asset/TestInputAgentModel',
            [BaseInputAgentModel],
            {
                username: 'username',
                password: 'password1'
            }
        );

        model.metadata = {
            fields: [
                {
                    id       : 'testUsername',
                    property : 'username',
                    dataType : 'string',
                    required : true,
                    validator: 'Sds/Validator/UsernameValidator'
                },
                {
                    id       : 'testPassword',
                    property : 'password',
                    title    : 'Password:',
                    dataType : 'string',
                    type     : 'password',
                    dijit    : 'dijit/form/ValidationTextBox',
                    required : true,
                    validator: 'Sds/Validator/PasswordValidator'
                }
            ]
        };

        return model;
    }
);
