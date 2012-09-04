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
            tableWrap: true,
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
                    id       : 'passwordInput',
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
