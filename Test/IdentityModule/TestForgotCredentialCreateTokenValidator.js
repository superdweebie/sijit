define([
        'doh/main',
        'Sds/IdentityModule/Validator/ForgotCredentialCreateTokenValidator'
    ],
    function(
        doh,
        ForgotCredentialCreateTokenValidator
    ){
        doh.register("Sds/Test/IdentityModule/Validator/TestForgotCredentialCreateTokenValidator", [

            function PositiveTest1(doh){
                var validator = new ForgotCredentialCreateTokenValidator;

                var model = {};
                model.identityName = 'Lucy';
                model.email = undefined;

                doh.assertTrue(validator.isValid(model).result);
            },

            function PostiviteTest2(doh){
                var validator = new ForgotCredentialCreateTokenValidator;

                var model = {};
                model.identityName = undefined;
                model.email = 'toby@here.com';

                doh.assertTrue(validator.isValid(model).result);
            },

            function NegativeTest(doh){
                var validator = new ForgotCredentialCreateTokenValidator;

                var model = {};
                model.identityName = undefined;
                model.email = undefined;

                doh.assertFalse(validator.isValid(model).result);
            }

        ]);
    }
);


