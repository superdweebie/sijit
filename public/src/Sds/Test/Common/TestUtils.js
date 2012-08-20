define([
        'doh/main',
        'dojo/_base/config',
        'Sds/Common/Utils'
    ],
    function(
        doh,
        config,
        Utils
    ){
        doh.register("Sds.Test.Common.TestUtils", [

            function ucFirstTest(doh){
                doh.assertEqual('Test', Utils.ucFirst('test'));
            },

            function isIntTest(doh){
                doh.assertTrue(Utils.isInt(1));
                doh.assertTrue(Utils.isInt(1.0));
                doh.assertTrue(Utils.isInt("1"));
                doh.assertFalse(Utils.isInt(true));
                doh.assertFalse(Utils.isInt(false));
                doh.assertFalse(Utils.isInt(1.5));
            },

            function fullUrlTest(doh){
               config.siteUrl = 'test.com';
               doh.assertEqual('test.com/test.php', Utils.fullUrl('test.php'));
            },

            function mixinDeepTest(doh) {

                var dest = {
                    item: {
                        a: 1,
                        b: 2
                    }
                };
                var source = {
                    item: {
                        a: 0,
                        c: 3
                    }
                }
                var result = {
                    item: {
                        a: 0,
                        b: 2,
                        c: 3
                    }
                }
                doh.assertEqual(result, Utils.mixinDeep(dest, source));
            },

            function countPropertiesTest(doh){

                var object = {
                    prop1: 1,
                    prop2: [2, ,3],
                    prop3: {three: 3}
                };

                doh.assertEqual(3, Utils.countProperties(object));
            }
        ]);
    }
);


