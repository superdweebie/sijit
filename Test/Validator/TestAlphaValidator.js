define([
        'doh/main',
        'Sds/Validator/AlphaValidator'
    ],
    function(
        doh,
        AlphaValidator
    ){
        doh.register("Sds.Test.Validator.TestAlphaValidator", [

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
                        doh.assertTrue(validator.isValid(testArray[index][1]));
                    } else {
                        doh.assertFalse(validator.isValid(testArray[index][1]));
                    }
                }
            },
        ]);
    }
);


