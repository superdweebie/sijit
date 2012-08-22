define([
        'doh/main',
        'Sds/Validator/PasswordValidator'
    ],
    function(
        doh,
        PasswordValidator
    ){
        doh.register("Sds.Test.Validator.TestPasswordValidator", [

            function ValidatorTest(doh){
                var validator = new PasswordValidator;

                doh.assertTrue(validator.isValid('password1'));
                doh.assertTrue(validator.isValid('password1@'));

                doh.assertFalse(validator.isValid('1abcd'));
                doh.assertFalse(validator.isValid('123456789'));
                doh.assertFalse(validator.isValid('password'));
                doh.assertFalse(validator.isValid('123456789123456789123456789123456789password'));
            },

        ]);
    }
);


