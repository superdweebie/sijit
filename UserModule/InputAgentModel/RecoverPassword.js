define ([
        'dojo/_base/declare',
        'Sds/InputAgent/BaseInputAgentModel'
    ],
    function (
        declare,
        BaseInputAgentModel
    ){
        var model = declare (
            'Sds/UserModel/InputAgentModel/RecoverPassword',
            [BaseInputAgentModel],
            {
                username: undefined,
                email: undefined
            }
        );

        model.metadata = {
            validators: [
                {
                    module:'Sds/UserModule/Validator/RecoverPasswordValidator'
                }
            ],
            fields: [
                {
                    id       : 'usernameInput',
                    property : 'username',
                    title    : 'Username:',
                    dataType : 'string',
                    validators: [
                        {
                            module: 'Sds/Validator/IdentifierValidator'
                        }
                    ]
                },
                {
                    id       : 'emailInput',
                    property : 'email',
                    title    : 'Email:',
                    dataType : 'string',
                    validators: [
                        {
                            module: 'Sds/Validator/EmailAddressValidator'
                        }
                    ]
                }
            ]
        };

        return model;
    }
);
