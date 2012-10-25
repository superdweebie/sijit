define([
        'doh/main',
        'Sds/IdentityModule/Validator/ForgotCredentialPart1Validator',
        'Sds/IdentityModule/ViewModel/ForgotCredentialPart1'
    ],
    function(
        doh,
        ForgotCredentialPart1Validator,
        ForgotCredentialPart1ViewModel
    ){
        doh.register("Sds/Test/Validator/TestForgotCredentialPart1Validator", [

            function PositiveTest1(doh){
                var validator = new ForgotCredentialPart1Validator;
                var model = new ForgotCredentialPart1ViewModel;

                model.identityName = 'Lucy';
                model.email = undefined;

                doh.assertTrue(validator.isValid(model));
            },

            function PostiviteTest2(doh){
                var validator = new ForgotCredentialPart1Validator;
                var model = new ForgotCredentialPart1ViewModel;

                model.identityName = undefined;
                model.email = 'toby@here.com';

                doh.assertTrue(validator.isValid(model));
            },

            function NegativeTest(doh){
                var validator = new ForgotCredentialPart1Validator;
                var model = new ForgotCredentialPart1ViewModel;

                model.identityName = undefined;
                model.email = undefined;

                doh.assertFalse(validator.isValid(model));
            }

        ]);
    }
);


