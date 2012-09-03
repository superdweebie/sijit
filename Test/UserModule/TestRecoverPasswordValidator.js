define([
        'doh/main',
        'Sds/UserModule/Validator/RecoverPasswordValidator',
        'Sds/UserModule/ViewModel/RecoverPassword'
    ],
    function(
        doh,
        RecoverPasswordValidator,
        RecoverPasswordViewModel
    ){
        doh.register("Sds.Test.Validator.TestRecoverPasswordValidator", [

            function PositiveTest1(doh){

                var validator = new RecoverPasswordValidator;
                var model = new RecoverPasswordViewModel;

                model.username = 'Lucy';
                model.email = undefined;

                doh.assertTrue(validator.isValid(model));
            },

            function PostiviteTest2(doh){
                var validator = new RecoverPasswordValidator;
                var model = new RecoverPasswordViewModel;

                model.username = undefined;
                model.email = 'toby@here.com';

                doh.assertTrue(validator.isValid(model));
            },

            function NegativeTest(doh){
                var validator = new RecoverPasswordValidator;
                var model = new RecoverPasswordViewModel;

                model.username = undefined;
                model.email = undefined;

                doh.assertFalse(validator.isValid(model));
            }

        ]);
    }
);


