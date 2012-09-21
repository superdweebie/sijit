define ([
        'dojo/_base/declare',
        'dojo/_base/lang',
        'Sds/UserModule/DataModel/User',
        'Sds/UserModule/DataModel/Profile',
        'Sds/View/BaseViewModel',
        'Sds/ServiceManager/Shared/getObject!usernameAvailableValidator'
    ],
    function (
        declare,
        lang,
        User,
        Profile,
        BaseViewModel,
        usernameAvailableValidator
    ){
        var model = declare (
            'Sds/UserModel/ViewModel/Register',
            [BaseViewModel],
            {
                username: undefined,
                password1: undefined,
                password2: undefined,
                firstname: undefined,
                lastname: undefined,
                email: undefined
            }
        );

        model.metadata = {
            cssClasses : ['form-horizontal'],
            validatorGroup: [
                {
                    'class':'Sds/UserModule/Validator/RegisterValidator'
                }
            ],
            fields: {
                username: lang.clone(User.metadata.fields.username),
                password1: lang.clone(User.metadata.fields.password),
                password2: lang.clone(User.metadata.fields.password),
                firstname: User.metadata.fields.firstname,
                lastname: User.metadata.fields.lastname,
                email: Profile.metadata.fields.email
            }
        };

        model.metadata.fields.username.validatorGroup.push(usernameAvailableValidator);
        model.metadata.fields.password1.id = 'passwordField1';
        model.metadata.fields.password2.id = 'passwordField2';

        return model;
    }
);
