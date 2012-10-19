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

            _resultDeferred: undefined,

            _validating: undefined,

            _validated: undefined,

            isValid: function(value){

                this.messages = [];

                if (value === this._validated){
                    return true;
                }

                if (value === this._validating){
                    return this._resultDeferred;
                }

                this._validating = value;

                this._resultDeferred = new Deferred;

                setTimeout(lang.hitch(this, function(){
                    this._isValid(value);
                }), 400);

                return this._resultDeferred;
            },

            _isValid: function(value){

                if (value != this._validating || value === this._validated){
                    return;
                }

                this.get('api').identityNameAvailable(value).then(
                    lang.hitch(this, function(result){
                        if ( ! result){
                            this.messages.push('This username is already taken. Please choose another');
                        }
                        this._validated = value;
                        this._resultDeferred.resolve(result);
                    }),
                    function(exception){
                        // If something goes wrong with the api call, assume the username is ok.
                        // This will be checked again server side anyway.
                        this._resultDeferred.resolve(true);
                    }
                );
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
