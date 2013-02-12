define([
        'doh/main',
        'Sds/Validator/Length'
    ],
    function(
        doh,
        Length
    ){
        doh.register("Sds/Test/Validator/TestLength", [

            function ValidatorTest(doh){
                var validator = new Length({min: 1, max: 5});

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


