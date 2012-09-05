define([
        'doh/main',
        'Sds/Common/Validator/PasswordValidator'
    ],
    function(
        doh,
        PasswordValidator
    ){
        doh.register("Sds.Test.Common.Validator.TestPasswordValidator", [

            function ValidatorTest(doh){
                var validator = new PasswordValidator;

                var testArray = [
                    [true, 'password1'],
                    [true, 'password1@'],
                    [false, '1abcd'],
                    [false, '123456789'],
                    [false, 'password'],
                    [false, '123456789123456789123456789123456789password']
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


