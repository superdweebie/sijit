define([
        'doh/main',
        'Sds/Common/Validator/AlphaValidator'
    ],
    function(
        doh,
        AlphaValidator
    ){
        doh.register("Sds/Test/Common/Validator/TestAlphaValidator", [

            function ValidatorTest(doh){
                var validator = new AlphaValidator;

                var testArray = [
                    [true, 'abc'],
                    [true, 'ABC'],
                    [false, 'a1'],
                    [false, 'a&']
                ];

                var index;
                for (index in testArray){
                    if (testArray[index][0]){
                        doh.assertTrue(validator.isValid(testArray[index][1]).result);
                    } else {
                        doh.assertFalse(validator.isValid(testArray[index][1]).result);
                    }
                }
            }
        ]);
    }
);


