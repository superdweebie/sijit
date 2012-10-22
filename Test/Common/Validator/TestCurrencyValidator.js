define([
        'doh/main',
        'Sds/Common/Validator/CurrencyValidator'
    ],
    function(
        doh,
        CurrencyValidator
    ){
        doh.register("Sds.Test.Common.Validator.TestCurrencyValidator", [

            function ValidatorTest(doh){
                var validator = new CurrencyValidator;

                var testArray = [
                    [true, '0'],
                    [true, '1'],
                    [true, '1.12'],
                    [false, '1a'],
                    [false, '1&'],
                    [false, '1.'],
                    [false, '1.123']
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


