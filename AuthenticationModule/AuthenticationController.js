define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/_base/json',
    'Sds/Common/Status',
    'dojox/rpc/Service',
    'dojo/Stateful',
    'Sds/ExceptionModule/throwEx',
    'Sds/AuthenticationModule/Exception/AlreadyLoggedInException',
    'Sds/AuthenticationModule/Exception/LoginFailedException',
    'dojox/rpc/JsonRPC'
],
function (
    declare,
    lang,
    Deferred,
    json,
    Status,
    RpcService,
    Stateful,
    throwEx,
    AlreadyLoggedInException,
    LoginFailedException
){
    return declare(
        'Sds/AuthenticationModule/AuthenticationController',
        [Stateful],
        {
            // summary:
            //		Controlls identity login and logout.

            //apiSmd: object | string
            //    May be an SMD object, or a url that will return an SMD.
            //    The SMD must define a json rpc interface to login and logout
            //    of a server.
            apiSmd: undefined,

            //api: object
            //    Is the api generated from the apiSmd
            api: undefined,

            //identity: object
            //    The identity object returned after a successful login
            identity: undefined,

            //loggedIn: boolean
            //    Indicates if there is a logged in identity
            loggedIn: false,

            //status: Sds/Common/Status
            //    An object indicating the current status
            status: undefined,

            // loginView: Sds.View.BaseView
            //     This form is shown to prompt login
            loginView: undefined,

            login: function()
            {
                // summary:
                //		Prompt for login details, and process
                // returns: Deferred
                //      Returned deferred will resolve when the whole login
                //      process is complete.

                this._loginDeferred = new Deferred();

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

                    this.get('api').login(formValue['identityName'], formValue['credential']).then(
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
                this.api.logout().then(
                    lang.hitch(this, '_logoutComplete'),
                    lang.hitch(this, '_handleException')
                );
                return this._logoutDeferred;
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
            _handleException: function(exception){
                // summary:
                //		Handles xhr exceptions during login and logout.

                if (exception.response){
                    exception = json.fromJson(exception.response.text).error;
                }

                var newException;
                switch (exception.type) {
                    case 'Sds\\AuthenticationModule\\Exception\\LoginFailedException':
                        newException = new LoginFailedException(exception.message)
                        break;
                    case 'Sds\\AuthenticationModule\\Exception\\AlreadyLoggedInException':
                        newException = new AlreadyLoggedInException(exception.message);
                        break;
                    default:
                        newException = exception;
                }

                // Update status
                this.set('status', new Status(exception.message, Status.icon.ERROR, 5000));

                throwEx(newException);

                if (this._loginDeferred && (! this._loginDeferred.isFulfilled())){
                    this._loginDeferred.reject(newException);
                }
                if (this._logutDeferred && (! this._logoutDeferred.isFulfilled())){
                    this._logoutDeferred.reject(newException);
                }
            }
        }
    );
});