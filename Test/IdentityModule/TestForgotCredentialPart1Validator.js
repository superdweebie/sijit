define([
        'doh/main',
        'Sds/IdentityModule/Validator/ForgotCredentialPart1Validator'
    ],
    function(
        doh,
        ForgotCredentialPart1Validator
    ){
        doh.register("Sds/Test/IdentityModule/Validator/TestForgotCredentialPart1Validator", [

            function PositiveTest1(doh){
                var validator = new ForgotCredentialPart1Validator;

                var model = {};
                model.identityName = 'Lucy';
                model.email = undefined;

                doh.assertTrue(validator.isValid(model).result);
            },

            function PostiviteTest2(doh){
                var validator = new ForgotCredentialPart1Validator;

                var model = {};
                model.identityName = undefined;
                model.email = 'toby@here.com';

                doh.assertTrue(validator.isValid(model).result);
            },

            function NegativeTest(doh){
                var validator = new ForgotCredentialPart1Validator;

                var model = {};
                model.identityName = undefined;
                model.email = undefined;

                doh.assertFalse(validator.isValid(model).result);
            }

        ]);
    }
);


