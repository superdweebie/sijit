define([
    'dojo/_base/declare',
    'dojo/Deferred',
    'dojo/when',
    'dojo/i18n!Sds/nls/identityModule',
    'Sds/Validator/Base',
    'get!Sds/Store/storeManager'
],
function(
    declare,
    Deferred,
    when,
    il8n,
    Base,
    storeManager
){
    return declare(
        [Base],
        {

            storeName: 'Identity',

            _isValid: function(value){

                var resultDeferred = new Deferred;

                var identityStore = storeManager.getStore(this.storeName);
                when(identityStore.get(value), function(identity){
                    if (identity == undefined){
                        //Store didn't return a value, so that username is probably available (it will be checked again server side)
                        resultDeferred.resolve({result: true, messages: []});
                    } else {
                        //Store returned a value, so that username must be taken.
                        resultDeferred.resolve({result: false, messages: [il8n.identityNameNotAvailable]});
                    }
                });

                return {result: resultDeferred, messages: [il8n.checkingIdentityNameAvaliable]};
            }
        }
    );
});
