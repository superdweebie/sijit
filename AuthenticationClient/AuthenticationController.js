define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/Deferred',
    'dojo/Stateful',
    '../Router/startedRouter!',
    'get!../Store/storeManager'
],
function (
    declare,
    lang,
    when,
    Deferred,
    Stateful,
    router,
    storeManager
){
    return declare(
        [Stateful],
        {
            // summary:
            //		Controlls identity.

            //identity: object
            //    The current identity object
            //identity: undefined,

            //loggedIn: boolean
            //    Indicates if there is a logged in identity
            //loggedIn: false,

            //loginForm: proxy,

            //enableRememberMe: true,

            //storeName: 'AuthenticatedIdentity',

            login: function()
            {
                // summary:
                //		Prompt for login details, and process

                this.loginForm.set('enableRememberMe', this.enableRememberMe);

                this.loginForm.show().then(lang.hitch(this, function(value){

                    // Do nothing if form not valid.
                    if (this.loginForm.get('state') != ''){
                        router.go(''); //go to router basePath
                        return;
                    }

                    // Send data to server
                    if (value.rememberMe){
                        value.rememberMe = Boolean(value['rememberMe'].length);
                    }

                    when(storeManager.getStore(this.storeName).put(value),
                        lang.hitch(this, '_loginComplete'),
                        lang.hitch(this, '_loginException')
                    );
                    this.loginView.set('value', null);
                }));
            },

            logout: function()
            {
                // summary:
                //		Send logout message to the server
                // returns: Deferred
                //      Returned deferred will resolve when the whole login
                //      process is complete.

                this._logoutDeferred = new Deferred();

                when(this.get('identity'), lang.hitch(this, function(identity){
                    if (! identity){
                        this._logoutDeferred.resolve(true);
                        return;
                    }

                    // Send message to server
                    storeManager.getStore(this.storeName).remove(this.identity.id).then(
                        lang.hitch(this, '_logoutComplete'),
                        lang.hitch(this, '_logoutException')
                    );
                }));

                return this._logoutDeferred;
            },

            _identityGetter: function(){
                if (this.identity === undefined){
                    if (this._getIdentityDeferred == undefined || this._getIdentityDeferred.isResolved()){
                        this._getIdentityDeferred = new Deferred;
                        when(storeManager.getStore(this.storeName).get(''),
                            lang.hitch(this, '_getIdentityComplete'),
                            lang.hitch(this, '_getIdentityException')
                        );
                    }
                    return this._getIdentityDeferred;
                }

                return this.identity;
            },

            _loginComplete: function(data) {
                // summary:
                //		Cleanup after login

                //Set the identity
                this._getIdentityComplete(data);
                this._loginDeferred.resolve(true);
            },

            _logoutComplete: function(data){
                // summary:
                //		Cleanup after logout

                // Set identity
                this._getIdentityComplete(data);
                this._logoutDeferred.resolve(true);
            },

            _getIdentityComplete: function(data){

                if (lang.isArray(data)){
                    data = data[0];
                }

                if (data){
                    this.set('loggedIn', true);
                } else {
                    data = false;
                    this.set('loggedIn', false);
                }
                this.identity = data; //Set the property first, otherwise _identityGetter is called again on the next line.
                this.set('identity', data); //Set via the setter so that watching callbacks fire

                if ( ! this._getIdentityDeferred.isResolved()){
                    this._getIdentityDeferred.resolve(data);
                }
            },

            _loginException: function(exception){
                throw exception;
                if (this._loginDeferred && (! this._loginDeferred.isFulfilled())){
                    this._loginDeferred.reject(exception);
                }
            },

            _logoutException: function(exception){
                throw exception;
                if (this._logutDeferred && (! this._logoutDeferred.isFulfilled())){
                    this._logoutDeferred.reject(exception);
                }
            },

            _getIdentityException: function(exception){
                throw exception;
                if (this._getIdentityDeferred && (! this._getIdentityDeferred.isFulfilled())){
                    this._getIdentityDeferred.reject(exception);
                }
            },

            _handleException: function(exception){

                // If the error has not happened on a get('identity') call,
                // refresh the identity from the server. Otherwise, just clear the
                // identity.
                if ( ! this._getIdentityDeferred || this._getIdentityDeferred.isFulfilled()){
                    this.identity = undefined;
                    this.get('identity');
                } else {
                    // Clear the identity
                    this.identity = false;
                    this.set('identity', false);
                    this.set('loggedIn', false);
                }
            }
        }
    );
});