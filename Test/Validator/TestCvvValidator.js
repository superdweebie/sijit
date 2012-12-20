define([
        'doh/main',
        'Sds/Validator/CvvValidator'
    ],
    function(
        doh,
        CvvValidator
    ){
        doh.register("Sds/Test/Validator/TestCvvValidator", [

            function ValidatorTest(doh){
                var validator = new CvvValidator;

                doh.assertTrue(validator.isValid('123').result); //string is ok
                doh.assertFalse(validator.isValid('5AA').result); //invalid characters are not ok
                doh.assertTrue(validator.isValid(723).result); //numbers are ok too
                doh.assertFalse(validator.isValid(7234).result); //too long
                doh.assertTrue(validator.isValid(612).result);
                doh.assertTrue(validator.isValid(421).result);
                doh.assertTrue(validator.isValid(543).result);

                validator.type = 'ax';
                doh.assertTrue(validator.isValid('1234').result);
                doh.assertTrue(validator.isValid(4321).result);
                doh.assertFalse(validator.isValid(43215).result); //too long
                doh.assertFalse(validator.isValid(215).result); //too short

            },

        ]);
    }
);


