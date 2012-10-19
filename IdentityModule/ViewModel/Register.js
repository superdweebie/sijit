define ([
        'dojo/_base/declare',
        'dojo/_base/lang',
        'Sds/IdentityModule/DataModel/Identity',
        'Sds/View/BaseViewModel',
        'Sds/ServiceManager/Shared/getObject!identityNameAvailableValidator'
    ],
    function (
        declare,
        lang,
        Identity,
        BaseViewModel,
        identityNameAvailableValidator
    ){
        var model = declare (
            'Sds/IdentityModel/ViewModel/Register',
            [BaseViewModel],
            {
                identityName: undefined,
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
                    'class':'Sds/IdentityModule/Validator/CredentialMatchValidator'
                }
            ],
            fields: {
                identityName: lang.clone(Identity.metadata.fields.identityName),
                password1: lang.clone(Identity.metadata.fields.credential),
                password2: lang.clone(Identity.metadata.fields.credential),
                firstname: Identity.metadata.fields.firstname,
                lastname: Identity.metadata.fields.lastname,
                email: Identity.metadata.fields.email
            }
        };

        model.metadata.fields.identityName.validatorGroup.push(identityNameAvailableValidator);
        model.metadata.fields.password1.id = 'passwordField1';
        model.metadata.fields.password2.id = 'passwordField2';

        return model;
    }
);
