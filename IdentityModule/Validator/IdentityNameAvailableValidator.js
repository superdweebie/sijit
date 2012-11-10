define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'Sds/Common/Validator/BaseValidator',
    'dojox/rpc/Service',
    'dojox/rpc/JsonRPC'
],
function(
    declare,
    lang,
    Deferred,
    BaseValidator,
    RpcService
){
    return declare(
        'Sds/IdentityModule/Validator/IdentityNameAvailableValidator',
        [BaseValidator],
        {

            //apiSmd: object | string
            //    May be an SMD object, or a url that will return an SMD.
            //    The SMD must define a json rpc interface to register and
            //    recover password
            //    from a server.
            apiSmd: undefined,

            //api: object
            //    Is the api generated from the apiSmd
            api: undefined,

            _isValid: function(value){

                var resultDeferred = new Deferred;

                this.get('api').identityNameAvailable(value).then(
                    lang.hitch(this, function(result){
                        var messages = [];
                        if ( ! result){
                            messages.push('This username is already taken. Please choose another');
                        } else {
                            messages.push('Username available');
                        }
                        resultDeferred.resolve({result: result, messages: messages});
                    }),
                    function(exception){
                        // If something goes wrong with the api call, assume the username is ok.
                        // This will be checked again server side anyway.
                        resultDeferred.resolve({result: true, messages: []});
                    }
                );

                return {result: resultDeferred, messages: ['checking if username is available']};
            },

            _apiGetter: function(){
                // summary:
                //		Get the json rpc api
                // returns: object
                //      Returns a json rpc api that can be used to call the server.

                if ( ! this.api) {
                    this.api = new RpcService(this.apiSmd);
                }
                return this.api;
            }
        }
    );
});
