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
                    response.resolve({user: 'toby'});
                } else {
                    if (this.loggedIn) {
                        response.reject(this._alreadyLoggedIn());
                    } else {
                        response.reject(this._loginFailed());
                    }
                }
                return response;
            },
            logout: function(){
                var response = new Deferred;
                response.resolve({});
                return response;
            },
            _loginFailed: function(){
                return new RequestError('Unable to load Mock Loign', {text: '{"id":0,"result":null,"error":{"type":"Sds\\\\AuthenticationModule\\\\Exception\\\\LoginFailedException","code":0,"message":"A record with the supplied identity could not be found."}}'});
            },
            _alreadyLoggedIn: function(){
                return new RequestError('Unable to load Mock Loign', {text: '{"id":0,"result":null,"error":{"type":"Sds\\\\AuthenticationModule\\\\Exception\\\\AlreadyLoggedInException","code":0,"message":"Already logged in."}}'});
            }
        }
    );
});


