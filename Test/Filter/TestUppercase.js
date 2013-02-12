define([
        'doh/main',
        'Sds/Filter/Uppercase'
    ],
    function(
        doh,
        Uppercase
    ){
        doh.register("Sds/Test/Filter/TestUppercase", [

            function FilterTest(doh){
                var filter = new Uppercase;

                var testArray = [
                    ['ABCD', 'Abcd'],
                    ['ABCD', 'aBcd'],
                    ['ABCD', 'ABCD']
                ];

                var index;
                for (index in testArray){
                    doh.assertEqual(testArray[index][0], filter.filter(testArray[index][1]));
                }
            }
        ]);
    }
);


