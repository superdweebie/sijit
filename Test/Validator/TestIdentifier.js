define([
        'doh/main',
        'Sds/Validator/Identifier'
    ],
    function(
        doh,
        Identifier
    ){
        doh.register("Sds/Test/Validator/TestIdentifier", [

            function ValidatorTest(doh){
                var validator = new Identifier;

                var testArray = [
                    [true, 'username'],
                    [true, 'username1'],
                    [true, '1username'],
                    [true, 'Username'],
                    [true, 'USERNAME1'],
                    [false, '1'],
                    [false, 'u'],
                    [false, '1234567890123456789012345678901234567890123456'],
                    [false, 'username%'],
                    [false, 'username@'],
                    [false, 'username/']
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


