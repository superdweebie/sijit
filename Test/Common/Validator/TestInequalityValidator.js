define([
        'doh/main',
        'Sds/Common/Validator/InequalityValidator'
    ],
    function(
        doh,
        InequalityValidator
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

        doh.register("Sds/Test/Common/Validator/TestInequalityValidator", [

            function lessThanTest(doh){
                var validator = new InequalityValidator({operator: InequalityValidator.LESS_THAN, compareValue: 10});

                var testArray = [
                    [true, 9],
                    [true, '9'],
                    [false, 10],
                    [false, 10.01]
                ];

                runTest(doh, validator, testArray);
            },

            function lessThanOrEqualTest(doh){
                var validator = new InequalityValidator({operator: InequalityValidator.LESS_THAN_EQUAL, compareValue: 10});

                var testArray = [
                    [true, 9],
                    [true, '9'],
                    [true, 10],
                    [false, 10.01]
                ];

                runTest(doh, validator, testArray);
            },

            function greaterThanTest(doh){
                var validator = new InequalityValidator({operator: InequalityValidator.GREATER_THAN, compareValue: 10});

                var testArray = [
                    [true, 11],
                    [true, '11'],
                    [false, 10],
                    [false, 9.9]
                ];

                runTest(doh, validator, testArray);
            },

            function greaterThanOrEqualTest(doh){
                var validator = new InequalityValidator({operator: InequalityValidator.GREATER_THAN_EQUAL, compareValue: 10});

                var testArray = [
                    [true, 11],
                    [true, '11'],
                    [true, 10],
                    [false, 9.9]
                ];

                runTest(doh, validator, testArray);
            },

            function notEqualTest(doh){
                var validator = new InequalityValidator({operator: InequalityValidator.NOT_EQUAL, compareValue: 10});

                var testArray = [
                    [true, 11],
                    [true, '11'],
                    [false, 10],
                    [true, 9.9]
                ];

                runTest(doh, validator, testArray);
            }
        ]);
    }
);
