define ([
        'dojo/_base/declare',
        'Sds/UserModule/Model/User',
        'Sds/UserModule/Model/Profile',
        'Sds/View/BaseViewModel'
    ],
    function (
        declare,
        User,
        Profile,
        BaseViewModel
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
            tableWrap: true,
            validators: [
                {
                    module:'Sds/UserModule/Validator/RegisterValidator'
                }
            ],
            fields: {
                username: User.metadata.fields.username,
                password1: {
                    id: "passwordField1",
                    property: "password1",
                    title: "Password:",
                    dataType: "string",
                    required: true,
                    type: "password",
                    validators: [
                        {
                            "module": "Sds\/Validator\/PasswordValidator"
                        }
                    ]
                },
                password2: {
                    id: "passwordField2",
                    property: "password2",
                    title: "Password again:",
                    dataType: "string",
                    required: true,
                    type: "password",
                    validators: [
                        {
                            "module": "Sds\/Validator\/PasswordValidator"
                        }
                    ]
                },
                firstname: User.metadata.fields.firstname,
                lastname: User.metadata.fields.lastname,
                email: Profile.metadata.fields.email
            }
        };

        return model;
    }
);
