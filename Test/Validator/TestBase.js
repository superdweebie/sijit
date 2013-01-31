define([
        'doh/main',
        'Sds/Validator/Base'
    ],
    function(
        doh,
        Base
    ){
        doh.register("Sds/Test/Validator/TestBase", [

            function ValidatorTest(doh){

                var validator = new Base;

                doh.assertTrue(Base.isValidator(validator));
                doh.assertFalse(Base.isValidator({}));
            }
        ]);
    }
);


