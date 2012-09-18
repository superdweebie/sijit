define ([
        'dojo/_base/declare',
        'Sds/View/BaseViewModel'
    ],
    function (
        declare,
        BaseViewModel
    ){
        var model = declare (
            'Sds/Test/View/Asset/TestViewModel',
            [BaseViewModel],
            {
                username: undefined,
                password: undefined
            }
        );

        model.metadata = {
            cssClasses : ['form-horizontal'],
            validatorGroup : [
                {
                    module: 'Sds/Test/View/Asset/ClassValidator',
                    options: null
                }
            ],
            fields: {
                username:
                {
                    id       : 'testUsername',
                    property : 'username',
                    dataType : 'string',
                    required : true,
                    validatorGroup: [
                        {
                            module : 'Sds/Common/Validator/IdentifierValidator',
                            options: null
                        }
                    ]
                },
                password:
                {
                    id       : 'testPassword',
                    property : 'password',
                    label    : 'Password:',
                    dataType : 'string',
                    type     : 'password',
                    required : true,
                    validatorGroup: [
                        {
                            module : 'Sds/Common/Validator/PasswordValidator',
                            options: null
                        }
                    ]
                }
            }
        };

        return model;
    }
);
