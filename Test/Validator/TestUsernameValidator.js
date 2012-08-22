define([
        'doh/main',
        'Sds/Validator/UsernameValidator'
    ],
    function(
        doh,
        UsernameValidator
    ){
        doh.register("Sds.Test.Validator.TestUsernameValidator", [

            function ValidatorTest(doh){
                var validator = new UsernameValidator;

                doh.assertTrue(validator.isValid('username'));
                doh.assertTrue(validator.isValid('username1'));
                doh.assertTrue(validator.isValid('1username'));
                doh.assertTrue(validator.isValid('Username'));
                doh.assertTrue(validator.isValid('USERNAME1'));

                doh.assertFalse(validator.isValid('1'));
                doh.assertFalse(validator.isValid('u'));
                doh.assertFalse(validator.isValid('1234567890123456789012345678901234567890123456'));
                doh.assertFalse(validator.isValid('username%'));
                doh.assertFalse(validator.isValid('username@'));
                doh.assertFalse(validator.isValid('username/'));
                doh.assertFalse(validator.isValid('username^'));
            },

        ]);
    }
);


