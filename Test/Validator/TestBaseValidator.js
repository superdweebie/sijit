define([
        'doh/main',
        'Sds/Validator/BaseValidator'
    ],
    function(
        doh,
        BaseValidator
    ){
        doh.register("Sds/Test/Validator/TestBaseValidator", [

            function ValidatorTest(doh){

                var validator = new BaseValidator;

                doh.assertTrue(BaseValidator.isValidator(validator));
                doh.assertFalse(BaseValidator.isValidator({}));
            }
        ]);
    }
);


