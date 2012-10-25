define([
        'doh/main',
        'Sds/IdentityModule/Validator/CredentialMatchValidator'
    ],
    function(
        doh,
        CredentialMatchValidator
    ){
        doh.register("Sds/Test/Validator/TestCredentialMatchValidator", [

            function PositiveTest(doh){
                var validator = new CredentialMatchValidator;

                doh.assertTrue(validator.isValid({credential: [
                    'password1',
                    'password1'
                ]}));

            },

            function NegativeTest(doh){
                var validator = new CredentialMatchValidator;

                doh.assertFalse(validator.isValid({credential: [
                    'password1',
                    'not password1'
                ]}));
            }

        ]);
    }
);
