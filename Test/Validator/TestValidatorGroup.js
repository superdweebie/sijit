define([
        'doh/main',
        'Sds/Validator/DatatypeValidator',
        'Sds/Validator/IdentifierValidator',
        'Sds/Validator/ValidatorGroup'
    ],
    function(
        doh,
        DatatypeValidator,
        IdentifierValidator,
        ValidatorGroup
    ){
        doh.register("Sds.Test.Validator.TestValidatorGroup", [

            function ValidatorTest(doh){

                var validator = new ValidatorGroup([
                    new DatatypeValidator(DatatypeValidator.datatypes.STRING),
                    new IdentifierValidator()
                ]);

                var testArray = [
                    [true, 'username'],
                    [false, 'u'],
                    [false, 1233456]
                ];

                var index;
                for (index in testArray){
                    if (testArray[index][0]){
                        doh.assertTrue(validator.isValid(testArray[index][1]));
                    } else {
                        doh.assertFalse(validator.isValid(testArray[index][1]));
                    }
                }
            }
        ]);
    }
);


