define([
        'doh/main',
        'Sds/is',
        'Sds/Filter/Base'
    ],
    function(
        doh,
        is,
        Base
    ){
        doh.register("Sds/Test/Filter/TestBase", [

            function FilterTest(doh){

                var filter = new Base;

                doh.assertTrue(is.isFilter(filter));
                doh.assertFalse(is.isFilter({}));
            }
        ]);
    }
);


