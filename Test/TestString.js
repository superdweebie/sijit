define([
        'doh/main',
        'Sds/string'
    ],
    function(
        doh,
        string
    ){
        doh.register("Sds/Test/TestString", [

            function ucFirstTest(doh){
                doh.assertEqual('Test', string.ucFirst('test'));
            }
        ]);
    }
);


