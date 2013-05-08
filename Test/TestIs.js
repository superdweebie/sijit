define([
        'doh/main',
        'dojo/Deferred',
        'Sds/is'
    ],
    function(
        doh,
        Deferred,
        is
    ){
        doh.register("Sds/Test/TestIs", [

            function isIntTest(doh){
                doh.assertTrue(is.isInt(1));
                doh.assertTrue(is.isInt(1.0));
                doh.assertTrue(is.isInt('1'));
                doh.assertFalse(is.isInt(true));
                doh.assertFalse(is.isInt(false));
                doh.assertFalse(is.isInt(1.5));
            },

            function isFloatTest(doh){
                doh.assertTrue(is.isFloat(1));
                doh.assertTrue(is.isFloat(1.0));
                doh.assertTrue(is.isFloat(1.5));
                doh.assertTrue(is.isFloat(0));
                doh.assertTrue(is.isFloat('0'));
                doh.assertTrue(is.isFloat('1'));
                doh.assertTrue(is.isFloat('1.5'));
                doh.assertFalse(is.isFloat(true));
                doh.assertFalse(is.isFloat(false));
                doh.assertFalse(is.isFloat('one point five'));
            },

            function isDeferredTest(doh){
                var deferred = new Deferred;

                doh.assertTrue(is.isDeferred(deferred));
                doh.assertFalse(is.isDeferred({}));
            },

            function isStatic(doh){
                var value;

                value = 1;
                doh.assertTrue(is.isStatic(value));

                value = 'asdf';
                doh.assertTrue(is.isStatic(value));

                value = {
                    a: 1,
                    b: 'asdf',
                    c: {
                        d: 2
                    }
                };
                doh.assertTrue(is.isStatic(value));

                value = function(){};
                doh.assertFalse(is.isStatic(value));

                value = {
                    a: 1,
                    b: 'asdf',
                    c: {
                        d: function(){}
                    }
                };
                doh.assertFalse(is.isStatic(value));                
            },
        ]);
    }
);


