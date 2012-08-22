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
            fields: [
                {
                    name: username,
                    type: string,
                    required: true,
                    validator: 'Sds/Validator/Username'
                },
                {
                    name: email,
                    type: string,
                    required: true,
                    validator: 'Sds/Validator/Email'
                }
            ]
        };

        return model;
    }
);
