define([
        'doh/main',
        'Sds/Common/Validator/DatatypeValidator'
    ],
    function(
        doh,
        DatatypeValidator
    ){
        doh.register("Sds.Test.Common.Validator.TestDatatypeValidator", [

            function StringTest(doh){
                var validator = new DatatypeValidator(DatatypeValidator.datatypes.STRING);

                doh.assertTrue(validator.isValid('password1'));
                doh.assertFalse(validator.isValid(1));
            },

            function BooleanTest(doh){
                var validator = new DatatypeValidator(DatatypeValidator.datatypes.BOOLEAN);

                doh.assertTrue(validator.isValid(true));
                doh.assertTrue(validator.isValid(false));
            },

            function IntTest(doh){
                var validator = new DatatypeValidator(DatatypeValidator.datatypes.INT);

                doh.assertTrue(validator.isValid(1));
                doh.assertTrue(validator.isValid('1'));

                doh.assertFalse(validator.isValid(1.1));
                doh.assertFalse(validator.isValid('1.1'));
                doh.assertFalse(validator.isValid('password'));
            },

            function FloatTest(doh){
                var validator = new DatatypeValidator(DatatypeValidator.datatypes.FLOAT);

                doh.assertTrue(validator.isValid(1));
                doh.assertTrue(validator.isValid('1'));
                doh.assertTrue(validator.isValid(1.1));
                doh.assertTrue(validator.isValid('1.1'));

                doh.assertFalse(validator.isValid('password'));
            }

        ]);
    }
);


