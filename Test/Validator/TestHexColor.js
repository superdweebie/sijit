define([
        'doh/main',
        'Sds/Validator/HexColor'
    ],
    function(
        doh,
        HexColor
    ){
        doh.register("Sds/Test/Validator/TestHexColor", [

            function ValidatorTest(doh){
                var validator = new HexColor;

                var testArray = [
                    [true, '#123ABF'],
                    [false, '!123ABF'],
                    [false, '123ABF'],
                    [false, '#1234ABF'],
                    [false, '#1234A']
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


