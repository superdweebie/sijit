define([
        'doh/main',
        'Sds/Filter/Propercase'
    ],
    function(
        doh,
        Propercase
    ){
        doh.register("Sds/Test/Filter/TestPropercase", [

            function FilterTest(doh){
                var filter = new Propercase;

                var testArray = [
                    ['Abcd', 'abcd'],
                    ['Abcd Efg', 'abcd efg']
                ];

                var index;
                for (index in testArray){
                    doh.assertEqual(testArray[index][0], filter.filter(testArray[index][1]));
                }
            }
        ]);
    }
);


