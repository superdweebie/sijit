define([
        'doh/main',
        'Sds/IdentityModule/Validator/CredentialMatch'
    ],
    function(
        doh,
        CredentialMatch
    ){
        doh.register("Sds/Test/IdentityModule/Validator/TestCredentialMatch", [

            function PositiveTest(doh){
                var validator = new CredentialMatch;

                doh.assertTrue(validator.isValid({credential: [
                    'password1',
                    'password1'
                ]}).result);

            },

            function NegativeTest(doh){
                var validator = new CredentialMatch;

                doh.assertFalse(validator.isValid({credential: [
                    'password1',
                    'not password1'
                ]}).result);
            }

        ]);
    }
);
