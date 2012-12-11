define([
        'doh/main',
        'Sds/Common/Validator/CreditCardValidator'
    ],
    function(
        doh,
        CreditCardValidator
    ){
        doh.register("Sds/Test/Common/Validator/TestCreditCardValidator", [

            function ValidatorTest(doh){
                var validator = new CreditCardValidator;

                //misc checks
                doh.assertFalse(validator.isValid('a4111111111111').result); //fails, alphas are not allowed
                doh.assertTrue(validator.isValid('5105105105105100').result); //test string input
                doh.assertTrue(validator.isValid('5105-1051 0510-5100').result); //test string input with dashes and spaces (commonly used when entering card #'s)
                
                doh.assertTrue(validator.isValid(5105105105105100).result); 
                doh.assertTrue(validator.isValid('5105105105105100').result); 
                
                //Mastercard/Eurocard checks
                doh.assertTrue(validator.isValid('5100000000000000').result);
                doh.assertTrue(validator.isValid('5200000000000000').result);
                doh.assertTrue(validator.isValid('5300000000000000').result);
                doh.assertTrue(validator.isValid('5400000000000000').result);
                doh.assertTrue(validator.isValid('5500000000000000').result);
                doh.assertFalse(validator.isValid('55000000000000000').result); //should fail, too long
                
                //Visa card checks
                doh.assertTrue(validator.isValid('4111111111111111').result);
                doh.assertTrue(validator.isValid('4111111111010').result); 
                
                //American Express card checks
                doh.assertTrue(validator.isValid('378 2822 4631 0005').result); 
                doh.assertTrue(validator.isValid('341-1111-1111-1111').result);
                
                //Diners Club/Carte Blanch card checks
                doh.assertTrue(validator.isValid('36400000000000').result); 
                doh.assertTrue(validator.isValid('38520000023237').result); 
                doh.assertTrue(validator.isValid('30009009025904').result); 
                doh.assertTrue(validator.isValid('30108009025904').result); 
                doh.assertTrue(validator.isValid('30207009025904').result); 
                doh.assertTrue(validator.isValid('30306009025904').result); 
                doh.assertTrue(validator.isValid('30405009025904').result);
                doh.assertTrue(validator.isValid('30504009025904').result); 
                
                //Discover card checks
                doh.assertTrue(validator.isValid('6011111111111117').result);
                
                //JCB card checks
                doh.assertTrue(validator.isValid('3530111333300000').result);
                doh.assertTrue(validator.isValid('213100000000001').result); 
                doh.assertTrue(validator.isValid('180000000000002').result); 
                doh.assertFalse(validator.isValid('1800000000000002').result); //should fail, good checksum, good prefix, but wrong length'
                //
                //Enroute card checks
                doh.assertTrue(validator.isValid('201400000000000').result);
                doh.assertTrue(validator.isValid('214900000000000').result);
            },

        ]);
    }
);


