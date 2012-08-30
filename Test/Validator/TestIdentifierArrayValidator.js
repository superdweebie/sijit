define([
        'doh/main',
        'Sds/Validator/IdentifierArrayValidator'
    ],
    function(
        doh,
        IdentifierArrayValidator
    ){
        doh.register("Sds.Test.Validator.TestIdentifierArrayValidator", [

            function ValidatorTest(doh){
                var validator = new IdentifierArrayValidator;

                var testArray = [
                    [true, ['username', 'username1', '1username']],
                    [false, ['username1', 'u']]
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


