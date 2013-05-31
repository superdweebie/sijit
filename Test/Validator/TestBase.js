define([
        'doh/main',
        'Sds/is',
        'Sds/Validator/Base'
    ],
    function(
        doh,
        is,
        Base
    ){
        doh.register("Sds/Test/Validator/TestBase", [

            function ValidatorTest(doh){

                var validator = new Base;

                doh.assertTrue(is.isValidator(validator));
                doh.assertFalse(is.isValidator({}));
            }
        ]);
    }
);


