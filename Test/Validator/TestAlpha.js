define([
        'doh/main',
        'Sds/Validator/Alpha'
    ],
    function(
        doh,
        Alpha
    ){
        doh.register("Sds/Test/Validator/TestAlpha", [

            function ValidatorTest(doh){
                var validator = new Alpha;

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


