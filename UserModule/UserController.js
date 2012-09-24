define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/_base/json',
    'Sds/Common/Status',
    'dojox/rpc/Service',
    'dojo/Stateful',
    'Sds/ExceptionModule/throwEx',
    'dojox/rpc/JsonRPC'
],
function(
    declare,
    lang,
    Deferred,
    json,
    Status,
    RpcService,
    Stateful,
    throwEx
){
    return declare
    (
        'sijit.UserModule.UserController',
        [Stateful],
        {
            // summary:
            //    Handles user CRUD, registration and password recovery

            userStoreUrl: undefined,

            userStore: undefined,

            //apiSmd: object | string
            //    May be an SMD object, or a url that will return an SMD.
            //    The SMD must define a json rpc interface to register and
            //    recover password
            //    from a server.
            apiSmd: undefined,

            //api: object
            //    Is the api generated from the apiSmd
            api: undefined,

            // recoverPasswordView: Sds/UserModule/View/RecoverPasswordView | Sds/ServiceManager/Proxy
            //     A recover password view, or proxy to a recover password view.
            recoverPasswordView: undefined,

            // registerView: Sds/UserModule/RegisterView | Sds/ServiceManager/Proxy
            //     A register view, or proxy to a register view.
            registerView: undefined,

            getUserStore: function(){
                if ( ! this.userStore) {
                    this.userStore = new JsonRest({target: this.userStoreUrl});
                }
                return this.userStore;
            },

            add: function(user){
                this.getStore().add(user);
            },

            recoverPassword: function(){
                // summary:
                //		Prompt for password recovery details, and process
                // returns: Deferred
                //      Returned deferred will resolve when the whole password recovery
                //      process is complete.

                this._recoverPasswordDeferred = new Deferred();

                this.recoverPasswordView.activate().then(lang.hitch(this, function(result){
                    // Do nothing if form not valid.
                    if (!result.state == ''){
                        this._recoverPasswordDeferred.resolve();
                    }

                    // Update status
                    this.set('status', new Status('sending password recovery request', Status.icon.SPINNER));

                    // Send data to server
                    var formValue = result.value;

                    this.get('api').recoverPassword(formValue['username'], formValue['email']).then(
                        lang.hitch(this, '_recoverPasswordComplete'),
                        lang.hitch(this, '_handleException')
                    );
                    this.recoverPasswordView.reset();
                }));

                return this._recoverPasswordDeferred;
            },

            register: function(){
                // summary:
                //		Allow a new user to register themselves
                // returns: Deferred
                //      Returned deferred will resolve when the registration is complete.

                this._registerDeferred = new Deferred();

                this.registerView.activate().then(lang.hitch(this, function(result){
                    // Do nothing if form not valid.
                    if (!result.state == ''){
                        this._registerDeferred.resolve();
                    }

                    // Update status
                    this.set('status', new Status('sending registration request', Status.icon.SPINNER));

                    this.get('api').register(result.value).then(
                        lang.hitch(this, '_registerComplete'),
                        lang.hitch(this, '_handleException')
                    );
                    this.registerView.reset();
                }));

                return this._registerDeferred;
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

            _recoverPasswordComplete: function(data)
            {
                this.set('status', new Status('password recovery email sent', Status.icon.SUCCESS, 5000));
                this._recoverPasswordDeferred.resolve(true);
            },

            _registerComplete: function(data)
            {
                this.set('status', new Status('registration complete', Status.icon.SUCCESS, 5000));
                this._registerDeferred.resolve(true);
            },

            _handleException: function(exception){
                // summary:
                //		Handles xhr exceptions.

                exception = json.fromJson(exception.response.text).error;

                throwEx(exception);

                if (this._recoverPasswordDeferred && (! this._recoverPasswordDeferred.isFulfilled())){
                    this._recoverPasswordDeferred.reject(exception);
                }
                if (this._registerDeferred && (! this._registerDeferred.isFulfilled())){
                    this._registerDeferred.reject(exception);
                }
            }
        }
    );
});