define ([
        'dojo/_base/declare',
        'Sds/View/BaseViewModel'
    ],
    function (
        declare,
        BaseViewModel
    ){
        var model = declare (
            'Sds/AuthModule/ViewModel/Login',
            [BaseViewModel],
            {
                username: undefined,
                password: undefined
            }
        );

        model.metadata = {
            cssClasses : ['form-horizontal'],
            fields: {
                username:
                {
                    id       : 'usernameInput',
                    property : 'username',
                    label    : 'Username:',
                    dataType : 'string',
                    validatorGroup: [
                        {
                            'class': 'Sds/Common/Validator/RequiredValidator'
                        },
                        {
                            'class': 'Sds/Common/Validator/IdentifierValidator'
                        }
                    ]
                },
                password:
                {
                    id       : 'passwordInput',
                    property : 'password',
                    label    : 'Password:',
                    dataType : 'string',
                    type     : 'password',
                    validatorGroup: [
                        {
                            'class': 'Sds/Common/Validator/RequiredValidator'
                        },
                        {
                            'class': 'Sds/Common/Validator/LengthValidator',
                            options: {min: 6, max: 40}
                        }
                    ]
                }
            }
        };

        return model;
    }
);
