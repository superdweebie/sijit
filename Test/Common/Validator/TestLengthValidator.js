define([
        'doh/main',
        'Sds/Common/Validator/LengthValidator'
    ],
    function(
        doh,
        LengthValidator
    ){
        doh.register("Sds/Test/Common/Validator/TestLengthValidator", [

            function ValidatorTest(doh){
                var validator = new LengthValidator({min: 1, max: 5});

                var testArray = [
                    [true, '1'],
                    [true, '12345'],
                    [false, ''],
                    [false, '123456']
                ];

                var index;
                for (index in testArray){
                    if (testArray[index][0]){
                        doh.assertTrue(validator.isValid(testArray[index][1]).result);
                    } else {
                        doh.assertFalse(validator.isValid(testArray[index][1]).result);
                    }
                }
            },
        ]);
    }
);


