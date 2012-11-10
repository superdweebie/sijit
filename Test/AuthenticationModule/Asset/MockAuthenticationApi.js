define([
    'dojo/_base/declare',
    'dojo/Deferred',
    'dojo/errors/RequestError'
],
function(
    declare,
    Deferred,
    RequestError
){
    return declare(
        'Sds/Test/AuthenticationModule/Asset/MockAuthenticationApi',
        null,
        {
            loggedIn: false,

            login: function(identityName, credential){

                var response = new Deferred;

                if ( ! this.loggedIn && identityName == 'toby' && credential == 'password'){
                    this.loggedIn = true;
                    response.resolve({identity: 'toby'});
                } else {
                    response.reject(this._loginFailed());
                }
                return response;
            },
            logout: function(){
                var response = new Deferred;
                this.loggedIn = false;
                response.resolve({});
                return response;
            },

            getIdentity: function(){
                var response = new Deferred;
                if (this.loggedIn){
                    response.resolve({identity: 'toby'});
                } else {
                    response.resolve({identity: null});
                }
                return response;
            },

            _loginFailed: function(){
                return new RequestError('Unable to load Mock Loign', {text: '{"id":0,"result":null,"error":{"type":"Sds\\\\AuthenticationModule\\\\Exception\\\\LoginFailedException","code":0,"message":"A record with the supplied identity could not be found."}}'});
            }
        }
    );
});


