define([
        'doh/main',
        'Sds/IdentityModule/Validator/CredentialMatchValidator'
    ],
    function(
        doh,
        CredentialMatchValidator
    ){
        doh.register("Sds/Test/IdentityModule/Validator/TestCredentialMatchValidator", [

            function PositiveTest(doh){
                var validator = new CredentialMatchValidator;

                doh.assertTrue(validator.isValid({credential: [
                    'password1',
                    'password1'
                ]}).result);

            },

            function NegativeTest(doh){
                var validator = new CredentialMatchValidator;

                doh.assertFalse(validator.isValid({credential: [
                    'password1',
                    'not password1'
                ]}).result);
            }

        ]);
    }
);
