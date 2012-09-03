define ([
        'dojo/_base/declare',
        'Sds/View/BaseViewModel'
    ],
    function (
        declare,
        BaseViewModel
    ){
        var model = declare (
            'Sds/UserModel/ViewModel/RecoverPassword',
            [BaseViewModel],
            {
                username: undefined,
                email: undefined
            }
        );

        model.metadata = {
            tableWrap: true,
            validators: [
                {
                    module:'Sds/UserModule/Validator/RecoverPasswordValidator'
                }
            ],
            fields: {
                username:
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
                email:
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
            }
        };

        return model;
    }
);
