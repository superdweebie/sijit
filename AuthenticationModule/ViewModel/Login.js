define ([
        'dojo/_base/declare',
        'Sds/View/BaseViewModel'
    ],
    function (
        declare,
        BaseViewModel
    ){
        var model = declare (
            'Sds/AuthenticationModule/ViewModel/Login',
            [BaseViewModel],
            {
                identityName: undefined,
                credential: undefined
            }
        );

        model.metadata = {
            cssClasses : ['form-horizontal'],
            fields: {
                identityName:
                {
                    id       : 'identityNameField',
                    property : 'identityName',
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
                credential:
                {
                    id       : 'credentialField',
                    property : 'credential',
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
                },
                rememberMe:
                {
                    id       : 'rememberMeField',
                    property : 'rememberMe',
                    label    : 'Remember me:',
                    dataType : 'boolean',
                    dijit    : 'Sds/Common/Form/Checkbox'
                }
            }
        };

        return model;
    }
);
