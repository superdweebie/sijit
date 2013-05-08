define([
        'doh/main',
        'Sds/array'
    ],
    function(
        doh,
        array
    ){
        doh.register("Sds/Test/TestArray", [

            function arraySubtractTest(doh){
                var removeFrom = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
                var removeValues = [2, 3];

                var result = array.subtract(removeFrom, removeValues);
                doh.assertEqual([1, 4, 5, 1, 4, 5], result);
            }
        ]);
    }
);


