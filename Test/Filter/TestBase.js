define([
        'doh/main',
        'Sds/Filter/Base'
    ],
    function(
        doh,
        Base
    ){
        doh.register("Sds/Test/Filter/TestBase", [

            function FilterTest(doh){

                var filter = new Base;

                doh.assertTrue(Base.isFilter(filter));
                doh.assertFalse(Base.isFilter({}));
            }
        ]);
    }
);


