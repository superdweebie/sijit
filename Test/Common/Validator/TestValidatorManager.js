define([
        'doh/main',
        'dojo/Deferred',
        'Sds/Common/Validator/ValidatorManager'
    ],
    function(
        doh,
        Deferred,
        ValidatorManager
    ){
        doh.register("Sds.Test.Common.Validator.TestValidatorManager", [

            function CreateTest(doh){

                var testDeferred = new Deferred;
                var validatorManager = new ValidatorManager;

                validatorManager.create('Sds/Common/Validator/DatatypeValidator', {requiredType: 'string'}).then(function(validator){

                    var testArray = [
                        [true, 'username'],
                        [false, 1233456]
                    ];

                    var index;
                    for (index in testArray){
                        if (testArray[index][0]){
                            doh.assertTrue(validator.isValid(testArray[index][1]));
                        } else {
                            doh.assertFalse(validator.isValid(testArray[index][1]));
                        }
                    }

                    testDeferred.resolve(true);
                });

                return testDeferred;
            },

            function CreateGroupTest(doh){

                var testDeferred = new Deferred;
                var validatorManager = new ValidatorManager;

                validatorManager.createGroup([
                    {
                        module: 'Sds/Common/Validator/DatatypeValidator',
                        options: {requiredType: 'string'}
                    },
                    {
                        module: 'Sds/Common/Validator/IdentifierValidator'
                    }
                ]).then(function(validator){

                    var testArray = [
                        [true, 'username'],
                        [false, 'u'],
                        [false, 1233456]
                    ];

                    var index;
                    for (index in testArray){
                        if (testArray[index][0]){
                            doh.assertTrue(validator.isValid(testArray[index][1]));
                        } else {
                            doh.assertFalse(validator.isValid(testArray[index][1]));
                        }
                    }

                    testDeferred.resolve(true);
                });

                return testDeferred;
            }
        ]);
    }
);


