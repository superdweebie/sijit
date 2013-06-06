define([
        'doh/main',
        'Sds/Validator/Currency'
    ],
    function(
        doh,
        Currency
    ){
        doh.register("Sds/Test/Validator/TestCurrency", [

            function ValidatorTest(doh){
                var validator = new Currency;

                var testArray = [
                    [true, ''],
                    [true, undefined],
                    [true, null],
                    [true, 0],
                    [true, 0.1],
                    [true, 0.11],
                    [true, 0.111],
                    [true, 1],
                    [true, 1.1],
                    [true, 1.11],
                    [true, 1.111],
                    [true, '0'],
                    [true, '0.1'],
                    [true, '0.11'],
                    [true, '0.111'],
                    [false, '0.0.111'],
                    [false, '1.1.111'],
                    [false, '$1.10'],
                    [false, '1.a']
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


