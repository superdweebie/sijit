define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/_base/json',
    'Sds/Common/Status',
    'dojox/rpc/Service',
    'dojo/Stateful',
    'Sds/ExceptionModule/throwEx',
    'Sds/ServiceManager/Shared/getProxy!recoverPasswordPart2ViewModel',
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
    throwEx,
    recoverPasswordPart2ViewModelProxy
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

            // recoverPasswordPart1View: Sds/UserModule/View/RecoverPasswordPart1View | Sds/ServiceManager/Proxy
            //     A recover password view part 1, or proxy to a recover password view.
            recoverPasswordPart1View: undefined,

            // recoverPasswordPart2View: Sds/UserModule/View/RecoverPasswordPart2View | Sds/ServiceManager/Proxy
            //     A recover password view part 2, or proxy to a recover password view.
            recoverPasswordPart2View: undefined,

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

            recoverPasswordPart1: function(){
                // summary:
                //		Prompt for password recovery details, and process
                // returns: Deferred
                //      Returned deferred will resolve when the whole password recovery
                //      process is complete.

                this._recoverPasswordPart1Deferred = new Deferred();

                this.recoverPasswordPart1View.activate().then(lang.hitch(this, function(result){
                    // Do nothing if form not valid.
                    if (!result.state == ''){
                        this._recoverPasswordPart1Deferred.resolve();
                    }

                    // Update status
                    this.set('status', new Status('sending password recovery request', Status.icon.SPINNER));

                    // Send data to server
                    var formValue = result.value;

                    this.get('api').recoverPasswordPart1(formValue['username'], formValue['email']).then(
                        lang.hitch(this, '_recoverPasswordPart1Complete'),
                        lang.hitch(this, '_handleException')
                    );
                    this.recoverPasswordPart1View.reset();
                }));

                return this._recoverPasswordPart1Deferred;
            },

            recoverPasswordPart2: function(){
                // summary:
                //     Prompt for the server generated recoverPasswordCode and a new
                //     password to complete the password recovery process
                // retrurns: Deferred

                this._recoverPasswordPart2Deferred = new Deferred();

                recoverPasswordPart2ViewModelProxy.getObject().then(function(recoverPasswordPart2ViewModel){
                    recoverPasswordPart2ViewModel.passwordRecoveryCode;
                    recoverPasswordPart2ViewModel.name;
                });


                this.recoverPasswordPart2View.activate().then(lang.hitch(this, function(result){
                    // Do nothing if form not valid.
                    if (!result.state == ''){
                        this._recoverPasswordPart2Deferred.resolve();
                    }

                    // Update status
                    this.set('status', new Status('sending password change request', Status.icon.SPINNER));

                    // Send data to server
                    var formValue = result.value;

                    this.get('api').recoverPasswordPart2(formValue['username'], formValue['password'][0], formValue['passwordRecoveryCode']).then(
                        lang.hitch(this, '_recoverPasswordPart2Complete'),
                        lang.hitch(this, '_handleException')
                    );
                    this.recoverPasswordPart2View.reset();
                }));

                return this._recoverPasswordPart2Deferred;
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

            _recoverPasswordPart1Complete: function(data)
            {
                this.set('status', new Status('password recovery email sent', Status.icon.SUCCESS, 5000));
                this._recoverPasswordPart1Deferred.resolve(true);
            },

            _recoverPasswordPart2Complete: function(data)
            {
                this.set('status', new Status('password changed', Status.icon.SUCCESS, 5000));
                this._recoverPasswordPart2Deferred.resolve(true);
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

                if (this._recoverPasswordPart1Deferred && (! this._recoverPasswordPart1Deferred.isFulfilled())){
                    this._recoverPasswordPart1Deferred.reject(exception);
                }
                if (this._recoverPasswordPart2Deferred && (! this._recoverPasswordPart2Deferred.isFulfilled())){
                    this._recoverPasswordPart2Deferred.reject(exception);
                }
                if (this._registerDeferred && (! this._registerDeferred.isFulfilled())){
                    this._registerDeferred.reject(exception);
                }
            }
        }
    );
});