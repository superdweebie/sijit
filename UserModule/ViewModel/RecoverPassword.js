define ([
        'dojo/_base/declare',
        'dojo/_base/lang',
        'Sds/View/BaseViewModel',
        'Sds/UserModule/DataModel/User',
        'Sds/UserModule/DataModel/Profile'
    ],
    function (
        declare,
        lang,
        BaseViewModel,
        User,
        Profile
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
                username: lang.clone(User.metadata.fields.username),
                email: lang.clone(Profile.metadata.fields.email)
            }
        };

        model.metadata.fields.username.required = false;
        model.metadata.fields.email.required = false;

        return model;
    }
);
