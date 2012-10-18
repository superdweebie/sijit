define([
        'doh/main',
        'Sds/UserModule/Validator/PasswordMatchValidator'
    ],
    function(
        doh,
        PasswordMatchValidator
    ){
        doh.register("Sds/Test/Validator/TestPasswordMatchValidator", [

            function PositiveTest(doh){
                var validator = new PasswordMatchValidator;

                doh.assertTrue(validator.isValid({password: [
                    'password1',
                    'password1'
                ]}));

            },

            function NegativeTest(doh){
                var validator = new PasswordMatchValidator;

                doh.assertFalse(validator.isValid({password: [
                    'password1',
                    'not password1'
                ]}));
            }

        ]);
    }
);
