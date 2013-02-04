define([
        'doh/main',
        'Sds/IdentityModule/Validator/ForgotCredentialCreateToken'
    ],
    function(
        doh,
        ForgotCredentialCreateToken
    ){
        doh.register("Sds/Test/IdentityModule/Validator/TestForgotCredentialCreateToken", [

            function PositiveTest1(doh){
                var validator = new ForgotCredentialCreateToken;

                var model = {};
                model.identityName = 'Lucy';
                model.email = undefined;

                doh.assertTrue(validator.isValid(model).result);
            },

            function PostiviteTest2(doh){
                var validator = new ForgotCredentialCreateToken;

                var model = {};
                model.identityName = undefined;
                model.email = 'toby@here.com';

                doh.assertTrue(validator.isValid(model).result);
            },

            function NegativeTest(doh){
                var validator = new ForgotCredentialCreateToken;

                var model = {};
                model.identityName = undefined;
                model.email = undefined;

                doh.assertFalse(validator.isValid(model).result);
            }

        ]);
    }
);


