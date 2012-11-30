define([
    'dojo/_base/declare',
    'dojo/Deferred',
    'Sds/Common/Validator/BaseValidator',
    'get!Sds/IdentityModule/IdentityController'
],
function(
    declare,
    Deferred,
    BaseValidator,
    identityController
){
    return declare(
        'Sds/IdentityModule/Validator/IdentityNameAvailableValidator',
        [BaseValidator],
        {

            _isValid: function(value){

                var resultDeferred = new Deferred;

                var identityStore = identityController.get('identityStore');
                identityStore.get(value).then(
                    function(){
                        //Store returned a value, so that username must be taken.
                        resultDeferred.resolve({result: false, messages: ['This username is already taken. Please choose another']});
                    }, function(){
                        //Store didn't return a value, so that username is probably available (it will be checked again server side)
                        resultDeferred.resolve({result: true, messages: []});
                    }
                );

                return {result: resultDeferred, messages: ['checking if username is available']};
            }
        }
    );
});
