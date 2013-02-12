define([
        'doh/main',
        'Sds/Validator/EmailAddress'
    ],
    function(
        doh,
        EmailAddress
    ){
        doh.register("Sds/Test/Validator/TestEmail", [

            function ValidatorTest(doh){
                var validator = new EmailAddress;

                doh.assertTrue(validator.isValid('x@yahoo.com').result);
                doh.assertFalse(validator.isValid('x@yahoo').result);
                doh.assertTrue(validator.isValid('x.y.z.w@yahoo.com').result);
                doh.assertFalse(validator.isValid('x..y.z.w@yahoo.com').result);
                doh.assertFalse(validator.isValid('x.@yahoo.com').result);
                doh.assertFalse(validator.isValid('.x@yahoo.com').result);
                doh.assertTrue(validator.isValid('azAZ09!#$%.&\'*+-/=?_`{|}y@yahoo.com').result);
                doh.assertTrue(validator.isValid('x=y@yahoo.com').result);
                doh.assertFalse(validator.isValid('x(y@yahoo.com').result);
                doh.assertFalse(validator.isValid('x)y@yahoo.com').result);
                doh.assertFalse(validator.isValid('x<y@yahoo.com').result);
                doh.assertFalse(validator.isValid('x>y@yahoo.com').result);
                doh.assertFalse(validator.isValid('x[y@yahoo.com').result);
                doh.assertFalse(validator.isValid('x]y@yahoo.com').result);
                doh.assertFalse(validator.isValid('x:y@yahoo.com').result);
                doh.assertFalse(validator.isValid('x;y@yahoo.com').result);
                doh.assertFalse(validator.isValid('x@y@yahoo.com').result);
                doh.assertFalse(validator.isValid('x\\y@yahoo.com').result);
                doh.assertFalse(validator.isValid('x,y@yahoo.com').result);
                doh.assertFalse(validator.isValid('x\"y@yahoo.com').result);
                doh.assertTrue(validator.isValid('x@z.com').result);
                doh.assertTrue(validator.isValid('x@yahoo.x').result);
                doh.assertTrue(validator.isValid('x@yahoo.museum').result);
                doh.assertTrue(validator.isValid("o'mally@yahoo.com").result);
                doh.assertTrue(validator.isValid("o''mally@yahoo.com").result);
                doh.assertTrue(validator.isValid("'mally@yahoo.com").result);
                doh.assertTrue(validator.isValid("fred&barney@stonehenge.com").result);
                doh.assertTrue(validator.isValid("fred&&barney@stonehenge.com").result);
            },

        ]);
    }
);


