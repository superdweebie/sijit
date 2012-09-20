define([
        'doh/main',
        'Sds/Common/Validator/BaseValidator'
    ],
    function(
        doh,
        BaseValidator
    ){
        doh.register("Sds/Test/Common/Validator/TestBaseValidator", [

            function ValidatorTest(doh){

                var validator = new BaseValidator;

                doh.assertTrue(BaseValidator.isValidator(validator));
                doh.assertFalse(BaseValidator.isValidator({}));
            }
        ]);
    }
);


