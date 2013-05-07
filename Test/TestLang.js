define([
        'doh/main',
        'Sds/lang'
    ],
    function(
        doh,
        lang
    ){
        doh.register("Sds/Test/TestLang", [

            function mixinDeepTest(doh) {

                var dest = {
                    item: {
                        a: 1,
                        b: {bb: 1}
                    }
                };
                var source = {
                    item: {
                        a: 0,
                        b: {dd: 5},
                        c: 3
                    }
                }
                var result = {
                    item: {
                        a: 0,
                        b: {bb: 1, dd:5},
                        c: 3
                    }
                }
                doh.assertEqual(result, lang.mixinDeep(dest, source));
            },

            function countPropertiesTest(doh){

                var object = {
                    prop1: 1,
                    prop2: [2, ,3],
                    prop3: {three: 3}
                };

                doh.assertEqual(3, lang.countProperties(object));
            }

        ]);
    }
);


