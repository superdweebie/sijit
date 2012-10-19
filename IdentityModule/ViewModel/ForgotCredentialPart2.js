define ([
        'dojo/_base/declare',
        'dojo/_base/lang',
        'Sds/View/BaseViewModel',
        'Sds/IdentityModule/DataModel/Identity'
    ],
    function (
        declare,
        lang,
        BaseViewModel,
        Identity
    ){
        var model = declare (
            'Sds/IdentityModel/ViewModel/ForgotCredentialPart2',
            [BaseViewModel],
            {
                forgotCredentialCode: undefined,
                identityName: undefined,
                credential1: undefined,
                credential2: undefined
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
                forgotCredentialCode: lang.clone(Identity.metadata.fields.forgotCredentialCode),
                name: lang.clone(Identity.metadata.fields.name),
                credential1: lang.clone(Identity.metadata.fields.credential),
                credential2: lang.clone(Identity.metadata.fields.credential)
            }
        };

        model.metadata.fields.forgotCredentialCode.validatorGroup = [{
            'class': 'Sds/Common/Validator/RequiredValidator'
        }];
        model.metadata.fields.credential1.id = 'credentialField1';
        model.metadata.fields.credential1.label = 'New Password:';
        model.metadata.fields.credential2.id = 'credentialField2';
        model.metadata.fields.credential2.label = 'New Password Again:';

        return model;
    }
);
