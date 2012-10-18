define([
        'doh/main',
        'Sds/UserModule/Validator/RecoverPasswordPart1Validator',
        'Sds/UserModule/ViewModel/RecoverPasswordPart1'
    ],
    function(
        doh,
        RecoverPasswordPart1Validator,
        RecoverPasswordPart1ViewModel
    ){
        doh.register("Sds/Test/Validator/TestRecoverPasswordPart1Validator", [

            function PositiveTest1(doh){
                var validator = new RecoverPasswordPart1Validator;
                var model = new RecoverPasswordPart1ViewModel;

                model.username = 'Lucy';
                model.email = undefined;

                doh.assertTrue(validator.isValid(model));
            },

            function PostiviteTest2(doh){
                var validator = new RecoverPasswordPart1Validator;
                var model = new RecoverPasswordPart1ViewModel;

                model.username = undefined;
                model.email = 'toby@here.com';

                doh.assertTrue(validator.isValid(model));
            },

            function NegativeTest(doh){
                var validator = new RecoverPasswordPart1Validator;
                var model = new RecoverPasswordPart1ViewModel;

                model.username = undefined;
                model.email = undefined;

                doh.assertFalse(validator.isValid(model));
            }

        ]);
    }
);


