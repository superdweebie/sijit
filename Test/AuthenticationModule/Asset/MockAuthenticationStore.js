define([
    'dojo/Deferred',
    'dojo/errors/RequestError'
],
function(
    Deferred,
    RequestError
){
    return {

        name: 'mockAuthStore',

        loggedIn: false,

        get: function(id){
            var response = new Deferred;
            if (this.loggedIn){
                response.resolve({id: 1, identityName: 'toby'});
            } else {
                response.resolve([]);
            }
            return response;
        },

        put: function(object){

            var response = new Deferred;

            if ( ! this.loggedIn && object.identityName == 'toby' && object.credential == 'password'){
                this.loggedIn = true;
                response.resolve({identityName: 'toby'});
            } else {
                response.reject(this._loginFailed());
            }
            return response;
        },

        remove: function(id){
            var response = new Deferred;
            this.loggedIn = false;
            response.resolve([]);
            return response;
        },

        _loginFailed: function(){
            return new RequestError('Simulated error for testing: Mock login, supplied credential is invalid', {text: '{"message":"Supplied credential is invalid.","type":"Sds\\\\AuthenticationModule\\\\Exception\\\\LoginFailedException"}'});
        }
    }
});


