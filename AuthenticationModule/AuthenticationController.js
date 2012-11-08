define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/store/JsonRest',
    'Sds/Common/Status',
    'dojo/Stateful',
    'Sds/ExceptionModule/throwEx'
],
function (
    declare,
    lang,
    Deferred,
    JsonRest,
    Status,
    Stateful,
    throwEx
){
    return declare(
        'Sds/AuthenticationModule/AuthenticationController',
        [Stateful],
        {
            // summary:
            //		Controlls identity login and logout.

            restUrl: undefined,

            //identity: object
            //    The identity object returned after a successful login
            identity: undefined,

            //loggedIn: boolean
            //    Indicates if there is a logged in identity
            loggedIn: undefined,

            //status: Sds/Common/Status
            //    An object indicating the current status
            status: undefined,

            // loginView: Sds.View.BaseView
            //     This form is shown to prompt login
            loginView: undefined,

            enableRememberMe: undefined,

            store: undefined,

            constructor: function(){
                this.store = new JsonRest(this.restUrl);
            },

            login: function()
            {
                // summary:
                //		Prompt for login details, and process
                // returns: Deferred
                //      Returned deferred will resolve when the whole login
                //      process is complete.

                this._loginDeferred = new Deferred();

                this.loginView.set('enableRememberMe', this.enableRememberMe);
                this.loginView.activate().then(lang.hitch(this, function(result){

                    // Do nothing if form not valid.
                    if (result.state != ''){
                        this._loginDeferred.resolve();
                        return;
                    }

                    // Update status
                    this.set('status', new Status('logging in', Status.icon.SPINNER));

                    // Send data to server
                    var formValue = result.value;
                    if (formValue.rememberMe){
                        formValue.rememberMe = Boolean(formValue['rememberMe'].length);
                    }

                    this.store.put(formValue).then(
                        lang.hitch(this, '_loginComplete'),
                        lang.hitch(this, '_handleException')
                    );
                    this.loginView.reset();
                }));

                return this._loginDeferred;
            },

            logout: function()
            {
                // summary:
                //		Send logout message to the server
                // returns: Deferred
                //      Returned deferred will resolve when the whole login
                //      process is complete.

                this._logoutDeferred = new Deferred();

                // Update status
                this.set('status', new Status('logging out', Status.icon.SPINNER));

                // Send message to server
                this.store.remove(-1).then(
                    lang.hitch(this, '_logoutComplete'),
                    lang.hitch(this, '_handleException')
                );
                return this._logoutDeferred;
            },

            _identityGetter: function(){
                if (this.identity === undefined){
                    this._getIdentityDeferred = new Deferred;
                    this.store.get(-1).then(
                        lang.hitch(this, '_getIdentityComplete'),
                        lang.hitch(this, '_handleException')
                    );
                    return this._getIdentityDeferred;
                }
                return this.identity;
            },

            _loginComplete: function(data) {
                // summary:
                //		Cleanup after login

                // Update status
                this.set('status', new Status('login complete', Status.icon.SUCCESS, 5000));

                //Set the identity
                this.set('identity', data.identity);
                this.set('loggedIn', true);
                this._loginDeferred.resolve(true);
            },

            _logoutComplete: function(data){
                // summary:
                //		Cleanup after logout

                // Update status
                this.set('status', new Status('logout complete', Status.icon.SUCCESS, 5000));

                // Set identity
                this.set('identity', data.identity);
                this.set('loggedIn', false);
                this._logoutDeferred.resolve(true);
            },

            _getIdentityComplete: function(data){

                if (data.hasIdentity){
                    this.set('loggedIn', true);
                } else {
                    this.set('loggedIn', false);
                }
                this.identity = data.identity; //Set the property first, otherwise _identityGetter is called again on the next line.
                this.set('identity', this.identity); //Set via the setter so that watching callbacks fire
                this._getIdentityDeferred.resolve(this.identity);
            },

            _handleException: function(exception){
                // summary:
                //		Handles xhr exceptions during login and logout.

                throwEx(exception).then(lang.hitch(this, function(standardizedException){

                    // Update status
                    this.set('status', new Status(standardizedException.message, Status.icon.ERROR, 5000));

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

                    if (this._loginDeferred && (! this._loginDeferred.isFulfilled())){
                        this._loginDeferred.reject(standardizedException);
                    }
                    if (this._logutDeferred && (! this._logoutDeferred.isFulfilled())){
                        this._logoutDeferred.reject(standardizedException);
                    }
                    if (this._getIdentityDeferred && (! this._getIdentityDeferred.isFulfilled())){
                        this._getIdentityDeferred.reject(standardizedException);
                    }

                }));
            }
        }
    );
});