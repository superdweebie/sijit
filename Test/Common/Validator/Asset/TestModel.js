define ([
        'dojo/_base/declare',
        'dojo/Stateful'
    ],
    function (
        declare,
        Stateful
    ){
        var model = declare (
            'Sds/Test/Common/Validator/TestModel',
            [Stateful],
            {
                // firstname: string
                firstname: undefined,

                // lastname: string
                lastname: undefined,

                // email: string
                email: undefined
            }
        );

        model.metadata = {
            validator: {
                    "class": "Sds/Test/Common/Validator/Asset/TestModelValidator",
                    options: {name: 'Liz'}
            },
            fields: {
                firstname: {
                    dataType: "string",
                    validator: [
                        {
                            "class": "Sds/Common/Validator/RequiredValidator"
                        },
                        {
                            "class": "Sds/Common/Validator/LengthValidator",
                            options: {min: 2, max: 3}
                        }
                    ]
                },
                lastname: {
                    dataType: "string",
                    validator: [
                        {
                            "class": "Sds/Common/Validator/RequiredValidator"
                        },
                        {
                            "class": "Sds/Common/Validator/PersonalNameValidator"
                        }
                    ]
                },
                email: {
                    dataType: "string",
                    validator: [
                        {
                            "class": "Sds/Common/Validator/EmailAddressValidator"
                        }
                    ]
                }
            }
        };

        return model;
    }
);
