define ([
        'dojo/_base/declare',
        'dojo/_base/lang',
        'Sds/View/BaseViewModel',
        'Sds/UserModule/DataModel/User'
    ],
    function (
        declare,
        lang,
        BaseViewModel,
        User
    ){
        var model = declare (
            'Sds/UserModel/ViewModel/RecoverPasswordPart1',
            [BaseViewModel],
            {
                name: undefined,
                email: undefined
            }
        );

        model.metadata = {
            cssClasses : ['form-horizontal'],
            validatorGroup: [
                {
                    'class': 'Sds/UserModule/Validator/RecoverPasswordPart1Validator'
                }
            ],
            fields: {
                name: lang.clone(User.metadata.fields.name),
                email: lang.clone(User.metadata.fields.email)
            }
        };

        model.metadata.fields.name.required = false;
        model.metadata.fields.email.required = false;

        return model;
    }
);
