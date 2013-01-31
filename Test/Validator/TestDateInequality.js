define([
        'doh/main',
        'Sds/Validator/DateInequality'
    ],
    function(
        doh,
        DateInequality
    ){

        var runTest = function(doh, validator, testArray){
            var index;
            for (index in testArray){
                if (testArray[index][0]){
                    doh.assertTrue(validator.isValid(testArray[index][1]).result);
                } else {
                    doh.assertFalse(validator.isValid(testArray[index][1]).result);
                }
            }
        };

        doh.register("Sds/Test/Validator/TestDateInequality", [

            function lessThanTest(doh){
                var validator = new DateInequality({operator: DateInequality.LESS_THAN, compareValue: new Date(2013, 1, 1)});

                var testArray = [
                    [true, new Date(2010, 1, 1)],
                    [true, new Date(2012, 12, 31)],
                    [false, new Date(2013, 1, 1)],
                    [false, new Date(2013, 1, 2)]
                ];

                runTest(doh, validator, testArray);
            },

            function lessThanOrEqualTest(doh){
                var validator = new DateInequality({operator: DateInequality.LESS_THAN_EQUAL, compareValue: new Date(2013, 1, 1)});

                var testArray = [
                    [true, new Date(2010, 1, 1)],
                    [true, new Date(2012, 12, 31)],
                    [true, new Date(2013, 1, 1)],
                    [false, new Date(2013, 1, 2)]
                ];

                runTest(doh, validator, testArray);
            },

            function greaterThanTest(doh){
                var validator = new DateInequality({operator: DateInequality.GREATER_THAN, compareValue: new Date(2013, 1, 1)});

                var testArray = [
                    [false, new Date(2010, 1, 1)],
                    [false, new Date(2012, 12, 31)],
                    [false, new Date(2013, 1, 1)],
                    [true, new Date(2013, 1, 2)]
                ];

                runTest(doh, validator, testArray);
            },

            function greaterThanOrEqualTest(doh){
                var validator = new DateInequality({operator: DateInequality.GREATER_THAN_EQUAL, compareValue: new Date(2013, 1, 1)});

                var testArray = [
                    [false, new Date(2010, 1, 1)],
                    [false, new Date(2012, 12, 31)],
                    [true, new Date(2013, 1, 1)],
                    [true, new Date(2013, 1, 2)]
                ];

                runTest(doh, validator, testArray);
            },

            function notEqualTest(doh){
                var validator = new DateInequality({operator: DateInequality.NOT_EQUAL, compareValue: new Date(2013, 1, 1)});

                var testArray = [
                    [true, new Date(2010, 1, 1)],
                    [true, new Date(2012, 12, 31)],
                    [false, new Date(2013, 1, 1)],
                    [true, new Date(2013, 1, 2)]
                ];

                runTest(doh, validator, testArray);
            }
        ]);
    }
);
