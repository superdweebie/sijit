define([
        'doh/main',
        'dojo/Deferred',
        'Sds/IdentityModule/Validator/IdentityNameAvailableValidator'
    ],
    function(
        doh,
        Deferred,
        IdentityNameAvailableValidator
    ){
        doh.register("Sds/Test/IdentityModule/Validator/TestIdentityNameAvailableValidator", [

            function PositiveTest(doh){

                var resultDeferred = new Deferred;
                var validator = new IdentityNameAvailableValidator;

                //Mock rpc api
                validator.api = {
                    identityNameAvailable: function(value){
                        var returnDeferred = new Deferred;
                        returnDeferred.resolve(true);
                        return returnDeferred;
                    }
                };

                validator.isValid('anything').result.then(function(resultObject){
                    doh.assertTrue(resultObject.result);
                    resultDeferred.resolve();
                });

                return resultDeferred;
            },

            function NegativeTest(doh){

                var resultDeferred = new Deferred;
                var validator = new IdentityNameAvailableValidator;

                //Mock rpc api
                validator.api = {
                    identityNameAvailable: function(value){
                        var returnDeferred = new Deferred;
                        returnDeferred.resolve(false);
                        return returnDeferred;
                    }
                };

                validator.isValid('anything').result.then(function(resultObject){
                    doh.assertFalse(resultObject.result);
                    resultDeferred.resolve();
                });

                return resultDeferred;
            }
        ]);
    }
);


