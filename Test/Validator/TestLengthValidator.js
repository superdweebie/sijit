define([
        'doh/main',
        'Sds/Validator/LengthValidator'
    ],
    function(
        doh,
        LengthValidator
    ){
        doh.register("Sds.Test.Validator.TestLengthValidator", [

            function ValidatorTest(doh){
                var validator = new LengthValidator(1, 5);

                var testArray = [
                    [true, '1'],
                    [true, '12345'],
                    [false, ''],
                    [false, '123456']
                ];

                var index;
                for (index in testArray){
                    if (testArray[index][0]){
                        doh.assertTrue(validator.isValid(testArray[index][1]));
                    } else {
                        doh.assertFalse(validator.isValid(testArray[index][1]));
                    }
                }
            },
        ]);
    }
);


