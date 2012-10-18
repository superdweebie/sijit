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
            'Sds/UserModel/ViewModel/RecoverPasswordPart2',
            [BaseViewModel],
            {
                passwordRecoveryCode: undefined,
                name: undefined,
                credential1: undefined,
                credential2: undefined
            }
        );

        model.metadata = {
            cssClasses : ['form-horizontal'],
            validatorGroup: [
                {
                    'class':'Sds/UserModule/Validator/PasswordMatchValidator'
                }
            ],
            fields: {
                passwordRecoveryCode: lang.clone(User.metadata.fields.passwordRecoveryCode),
                name: lang.clone(User.metadata.fields.name),
                credential1: lang.clone(User.metadata.fields.credential),
                credential2: lang.clone(User.metadata.fields.credential)
            }
        };

        model.metadata.fields.passwordRecoveryCode.validatorGroup = [{
            'class': 'Sds/Common/Validator/RequiredValidator'
        }];
        model.metadata.fields.credential1.id = 'credentialField1';
        model.metadata.fields.credential1.label = 'New Password:';
        model.metadata.fields.credential2.id = 'credentialField2';
        model.metadata.fields.credential2.label = 'New Password Again:';

        return model;
    }
);
