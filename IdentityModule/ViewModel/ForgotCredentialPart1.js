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
            'Sds/IdentityModel/ViewModel/ForgotCredentialPart1',
            [BaseViewModel],
            {
                identityName: undefined,
                email: undefined
            }
        );

        model.metadata = {
            cssClasses : ['form-horizontal'],
            validatorGroup: [
                {
                    'class': 'Sds/IdentityModule/Validator/ForgotCredentialPart1Validator'
                }
            ],
            fields: {
                identityName: lang.clone(Identity.metadata.fields.identityName),
                email: lang.clone(Identity.metadata.fields.email)
            }
        };

        model.metadata.fields.identityName.required = false;
        model.metadata.fields.email.required = false;

        return model;
    }
);
