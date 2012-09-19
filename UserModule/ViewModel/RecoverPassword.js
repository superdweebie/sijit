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
            cssClasses : ['form-horizontal'],
            validatorGroup: [
                {
                    'class': 'Sds/UserModule/Validator/RecoverPasswordValidator'
                }
            ],
            fields: {
                username:
                {
                    id       : 'usernameInput',
                    property : 'username',
                    label    : 'Username:',
                    dataType : 'string',
                    validatorGroup: [
                        {
                            'class': 'Sds/Common/Validator/IdentifierValidator'
                        }
                    ]
                },
                email:
                {
                    id       : 'emailInput',
                    property : 'email',
                    label    : 'Email:',
                    dataType : 'string',
                    validatorGroup: [
                        {
                            'class': 'Sds/Common/Validator/EmailAddressValidator'
                        }
                    ]
                }
            }
        };

        return model;
    }
);
