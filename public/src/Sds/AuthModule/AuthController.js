define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/when',
    'dojo/_base/json',
    'Sds/Common/Status',
    'dojox/rpc/Service',
    'dojo/Stateful',
    'Sds/ServiceManager/SafeGetPropertyMixin',
    'Sds/AuthModule/Exception/AlreadyLoggedInException',
    'Sds/AuthModule/Exception/LoginFailedException',
    'dojox/rpc/JsonRPC'
],
function (
    declare,
    lang,
    Deferred,
    when,
    json,
    Status,
    RpcService,
    Stateful,
    SafeGetPropertyMixin,
    AlreadyLoggedInException,
    LoginFailedException
){
    return declare(
        'Sds.AuthModule.AuthController',
        [Stateful, SafeGetPropertyMixin],
        {
            // summary:
            //		Controlls user login and logout.

            //authApiSmd: object | string
            //    May be an SMD object, or a url that will return an SMD.
            //    The SMD must define a json rpc interface to login and logout
            //    of a server.
            authApiSmd: undefined,

            //authApi: object
            //    Is the api generated from the authApiSmd
            authApi: undefined,

            //activeUser: object
            //    The user object returned after a successful login
            activeUser: undefined,

            //loggedIn: boolean
            //    Indicates if there is a logged in activeUser
            loggedIn: false,

            //status: Sds/Common/Status
            //    An object indicating the current status
            status: undefined,

            //exceptionManager: Sds\ExceptionManager\ExceptionManagerInterface | Sds.ServiceManager.Ref
            //    Will handle xhr errors
            exceptionManager: undefined,

            // loginInputAgent: Sds.InputAgent.BaseInputAgent
            //     This form is shown to prompt login
            loginInputAgent: undefined,

            login: function()
            {
                // summary:
                //		Prompt for login details, and process
                // returns: Deferred
                //      Returned deferred will resolve when the whole login
                //      process is complete.

                this._loginDeferred = new Deferred();

                when(this.loginInputAgent.activate(), lang.hitch(this, function(result){

                    // Do nothing if form not valid.
                    if (!result.state == ''){
                        this._loginDeferred.resolve();
                    }

                    // Update status
                    this.set('status', new Status('logging in', Status.icon.SPINNER));

                    // Send data to server
                    var formValue = result.value;

                    this.get('authApi').login(formValue['username'], formValue['password']).then(
                        lang.hitch(this, '_loginComplete'),
                        lang.hitch(this, '_handleException')
                    );
                    this.loginInputAgent.reset();
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
                this.authApi.logout().then(
                    lang.hitch(this, '_logoutComplete'),
                    lang.hitch(this, '_handleException')
                );
                return this._logoutDeferred;
            },
            _authApiGetter: function(){
                // summary:
                //		Get the json rpc api
                // returns: object
                //      Returns a json rpc api that can be used to call the server.

                if ( ! this.authApi) {
                    this.authApi = new RpcService(this.authApiSmd);
                }
                return this.authApi;
            },
            _loginComplete: function(data) {
                // summary:
                //		Cleanup after login

                // Update status
                this.set('status', new Status('login complete', Status.icon.SUCCESS, 5000));

                //Set the active user
                this.set('activeUser', data.user);
                this.set('loggedIn', true);
                this._loginDeferred.resolve(true);
            },
            _logoutComplete: function(data){
                // summary:
                //		Cleanup after logout

                // Update status
                this.set('status', new Status('logout complete', Status.icon.SUCCESS, 5000));

                // Set active user
                this.set('activeUser', data.user);
                this.set('loggedIn', false);
                this._logoutDeferred.resolve(true);
            },
            _handleException: function(exception){
                // summary:
                //		Handles xhr exceptions during login and logout. Will pass the exception
                //		off to the configured exceptionManager

                exception = json.fromJson(exception.response.text).error;

                var newException;
                switch (exception.type) {
                    case 'Sds\\AuthModule\\Exception\\LoginFailedException':
                        newException = new LoginFailedException(exception.message)
                        break;
                    case 'Sds\\AuthModule\\Exception\\AlreadyLoggedInException':
                        newException = new AlreadyLoggedInException(exception.message);
                        break;
                    default:
                        newException = exception;
                }

                when(this.safeGetProperty('exceptionManager'), function(exceptionManager){
                    exceptionManager.handle(newException);
                })

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