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
                username: 'toby',
                password: 'password1'
            }
        );

        model.metadata = {
            validators : [
                {
                    module: 'Sds/Test/InputAgent/Asset/ClassValidator',
                    options: null
                }
            ],
            fields: [
                {
                    id       : 'testUsername',
                    property : 'username',
                    dataType : 'string',
                    required : true,
                    validators: [
                        {
                            module : 'Sds/Validator/IdentifierValidator',
                            options: null
                        }
                    ]
                },
                {
                    id       : 'testPassword',
                    property : 'password',
                    title    : 'Password:',
                    dataType : 'string',
                    type     : 'password',
                    dijit    : 'dijit/form/ValidationTextBox',
                    required : true,
                    validators: [
                        {
                            module : 'Sds/Validator/PasswordValidator',
                            options: null
                        }
                    ]
                }
            ]
        };

        return model;
    }
);
