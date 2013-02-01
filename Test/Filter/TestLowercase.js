define([
        'doh/main',
        'Sds/Filter/Lowercase'
    ],
    function(
        doh,
        Lowercase
    ){
        doh.register("Sds/Test/Filter/TestLowercase", [

            function FilterTest(doh){
                var filter = new Lowercase;

                var testArray = [
                    ['abcd', 'Abcd'],
                    ['abcd', 'aBcd'],
                    ['abcd', 'ABCD']
                ];

                var index;
                for (index in testArray){
                    doh.assertEqual(testArray[index][0], filter.filter(testArray[index][1]));
                }
            }
        ]);
    }
);


