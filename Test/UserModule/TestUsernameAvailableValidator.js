define([
        'doh/main',
        'dojo/Deferred',
        'Sds/UserModule/Validator/UsernameAvailableValidator'
    ],
    function(
        doh,
        Deferred,
        UsernameAvailableValidator
    ){
        doh.register("Sds/Test/Validator/TestUsernameAvailableValidator", [

            function PositiveTest(doh){

                var resultDeferred = new Deferred;
                var validator = new UsernameAvailableValidator;

                //Mock rpc api
                validator.api = {
                    usernameAvailable: function(value){
                        var returnDeferred = new Deferred;
                        returnDeferred.resolve(true);
                        return returnDeferred;
                    }
                };

                validator.isValid('anything').then(function(result){
                    doh.assertTrue(result);
                    resultDeferred.resolve();
                });

                return resultDeferred;
            },

            function NegativeTest(doh){

                var resultDeferred = new Deferred;
                var validator = new UsernameAvailableValidator;

                //Mock rpc api
                validator.api = {
                    usernameAvailable: function(value){
                        var returnDeferred = new Deferred;
                        returnDeferred.resolve(false);
                        return returnDeferred;
                    }
                };

                validator.isValid('anything').then(function(result){
                    doh.assertFalse(result);
                    resultDeferred.resolve();
                });

                return resultDeferred;
            }
        ]);
    }
);


