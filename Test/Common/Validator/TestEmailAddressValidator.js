define([
        'doh/main',
        'Sds/Common/Validator/EmailAddressValidator'
    ],
    function(
        doh,
        EmailAddressValidator
    ){
        doh.register("Sds.Test.Common.Validator.TestEmailValidator", [

            function ValidatorTest(doh){
                var validator = new EmailAddressValidator;

                doh.assertTrue(validator.isValid('x@yahoo.com'));
                doh.assertFalse(validator.isValid('x@yahoo'));
                doh.assertTrue(validator.isValid('x.y.z.w@yahoo.com'));
                doh.assertFalse(validator.isValid('x..y.z.w@yahoo.com'));
                doh.assertFalse(validator.isValid('x.@yahoo.com'));
                doh.assertFalse(validator.isValid('.x@yahoo.com'));
                doh.assertTrue(validator.isValid('azAZ09!#$%.&\'*+-/=?_`{|}y@yahoo.com'));
                doh.assertTrue(validator.isValid('x=y@yahoo.com'));
                doh.assertFalse(validator.isValid('x(y@yahoo.com'));
                doh.assertFalse(validator.isValid('x)y@yahoo.com'));
                doh.assertFalse(validator.isValid('x<y@yahoo.com'));
                doh.assertFalse(validator.isValid('x>y@yahoo.com'));
                doh.assertFalse(validator.isValid('x[y@yahoo.com'));
                doh.assertFalse(validator.isValid('x]y@yahoo.com'));
                doh.assertFalse(validator.isValid('x:y@yahoo.com'));
                doh.assertFalse(validator.isValid('x;y@yahoo.com'));
                doh.assertFalse(validator.isValid('x@y@yahoo.com'));
                doh.assertFalse(validator.isValid('x\\y@yahoo.com'));
                doh.assertFalse(validator.isValid('x,y@yahoo.com'));
                doh.assertFalse(validator.isValid('x\"y@yahoo.com'));
                doh.assertTrue(validator.isValid('x@z.com'));
                doh.assertTrue(validator.isValid('x@yahoo.x'));
                doh.assertTrue(validator.isValid('x@yahoo.museum'));
                doh.assertTrue(validator.isValid("o'mally@yahoo.com"));
                doh.assertTrue(validator.isValid("o''mally@yahoo.com"));
                doh.assertTrue(validator.isValid("'mally@yahoo.com"));
                doh.assertTrue(validator.isValid("fred&barney@stonehenge.com"));
                doh.assertTrue(validator.isValid("fred&&barney@stonehenge.com"));

            },

        ]);
    }
);


