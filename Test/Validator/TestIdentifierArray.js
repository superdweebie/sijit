define([
        'doh/main',
        'Sds/Validator/IdentifierArray'
    ],
    function(
        doh,
        IdentifierArray
    ){
        doh.register("Sds/Test/Validator/TestIdentifierArray", [

            function ValidatorTest(doh){
                var validator = new IdentifierArray;

                var testArray = [
                    [true, ['username', 'username1', '1username']],
                    [false, ['username1', 'u']]
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


