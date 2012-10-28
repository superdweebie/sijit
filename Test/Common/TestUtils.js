define([
        'doh/main',
        'dojo/_base/config',
        'Sds/Common/utils'
    ],
    function(
        doh,
        config,
        utils
    ){
        doh.register("Sds/Test/Common/TestUtils", [

            function ucFirstTest(doh){
                doh.assertEqual('Test', utils.ucFirst('test'));
            },

            function isIntTest(doh){
                doh.assertTrue(utils.isInt(1));
                doh.assertTrue(utils.isInt(1.0));
                doh.assertTrue(utils.isInt('1'));
                doh.assertFalse(utils.isInt(true));
                doh.assertFalse(utils.isInt(false));
                doh.assertFalse(utils.isInt(1.5));
            },

            function isFloatTest(doh){
                doh.assertTrue(utils.isFloat(1));
                doh.assertTrue(utils.isFloat(1.0));
                doh.assertTrue(utils.isFloat(1.5));
                doh.assertTrue(utils.isFloat(0));
                doh.assertTrue(utils.isFloat('0'));
                doh.assertTrue(utils.isFloat('1'));
                doh.assertTrue(utils.isFloat('1.5'));
                doh.assertFalse(utils.isFloat(true));
                doh.assertFalse(utils.isFloat(false));
                doh.assertFalse(utils.isFloat('one point five'));
            },

            function fullUrlTest(doh){
               config.siteUrl = 'test.com';
               doh.assertEqual('test.com/test.php', utils.fullUrl('test.php'));
            },

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
                doh.assertEqual(result, utils.mixinDeep(dest, source));
            },

            function countPropertiesTest(doh){

                var object = {
                    prop1: 1,
                    prop2: [2, ,3],
                    prop3: {three: 3}
                };

                doh.assertEqual(3, utils.countProperties(object));
            },

            function arraySubtractTest(doh){
                var removeFrom = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
                var removeValues = [2, 3];

                var result = utils.arraySubtract(removeFrom, removeValues);
                doh.assertEqual([1, 4, 5, 1, 4, 5], result);
            }
        ]);
    }
);


