define([
    'dojo/_base/declare',
    'Sds/Common/Validator/BaseValidator',
    'dojox/rpc/Service',
    'dojox/rpc/JsonRPC'
],
function(
    declare,
    BaseValidator,
    RpcService
){
    return declare(
        'Sds/UserModule/Validator/UsernameAvailableValidator',
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

            isValid: function(value){

                this.messages = [];

                var resultDeferred = new Deferred;

                this.get('api').usernameAvailable(value).then(
                    function(result){
                        if ( ! result.isAvailable){
                            this.messages.push('This username is already taken. Please choose another');
                        }
                        resultDeferred.resolve(result.isAvailable);
                    },
                    function(exception){
                        // If something goes wrong with the api call, assume the username is ok.
                        // This will be checked again server side anyway.
                        resultDeferred.resolve(true);
                    }
                );
                    
                return resultDeferred;
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
