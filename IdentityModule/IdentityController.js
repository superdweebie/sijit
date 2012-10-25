define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/_base/json',
    'Sds/Common/Status',
    'dojox/rpc/Service',
    'dojo/Stateful',
    'Sds/ExceptionModule/throwEx',
    'Sds/ServiceManager/Shared/getProxy!Sds/IdentityModule/ViewModel/ForgotCredentialPart2',
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
    forgotCredentialPart2ViewModelProxy
){
    return declare
    (
        'Sds/IdentityModule/IdentityController',
        [Stateful],
        {
            // summary:
            //    Handles Identity CRUD, registration and password recovery

            identityStoreUrl: undefined,

            identityStore: undefined,

            //apiSmd: object | string
            //    May be an SMD object, or a url that will return an SMD.
            //    The SMD must define a json rpc interface to register and
            //    recover password
            //    from a server.
            apiSmd: undefined,

            //api: object
            //    Is the api generated from the apiSmd
            api: undefined,

            // forgotCredentialPart1View: Sds/IdentityModule/View/ForgotCredentialPart1View | Sds/ServiceManager/Proxy
            //     A recover password view part 1, or proxy to a recover password view.
            forgotCredentialPart1View: undefined,

            // forgotCredentialPart2View: Sds/IdentityModule/View/ForgotCredentialPart2View | Sds/ServiceManager/Proxy
            //     A recover password view part 2, or proxy to a recover password view.
            forgotCredentialPart2View: undefined,

            // registerView: Sds/IdentityModule/RegisterView | Sds/ServiceManager/Proxy
            //     A register view, or proxy to a register view.
            registerView: undefined,

            //status: Sds/Common/Status
            //    An object indicating the current status
            status: undefined,

            getIdentityStore: function(){
                if ( ! this.identityStore) {
                    this.identityStore = new JsonRest({target: this.identityStoreUrl});
                }
                return this.identityStore;
            },

            forgotCredentialAction: function(){
                return this.forgotCredentialPart1();
            },

            registerAction: function(){
                return this.register();
            },

            forgotCredentialPart1: function(){
                // summary:
                //		Prompt for password recovery details, and process
                // returns: Deferred
                //      Returned deferred will resolve when the whole password recovery
                //      process is complete.

                this._forgotCredentialPart1Deferred = new Deferred();

                this.forgotCredentialPart1View.activate().then(lang.hitch(this, function(result){
                    // Do nothing if form not valid.
                    if (!result.state == ''){
                        this._forgotCredentialPart1Deferred.resolve();
                    }

                    // Update status
                    this.set('status', new Status('sending password recovery request', Status.icon.SPINNER));

                    // Send data to server
                    var formValue = result.value;

                    this.get('api').forgotCredentialPart1(formValue['identityName'], formValue['email']).then(
                        lang.hitch(this, '_forgotCredentialPart1Complete'),
                        lang.hitch(this, '_handleException')
                    );
                    this.forgotCredentialPart1View.reset();
                }));

                return this._forgotCredentialPart1Deferred;
            },

            forgotCredentialPart2: function(){
                // summary:
                //     Prompt for the server generated forgotCredentialCode and a new
                //     password to complete the password recovery process
                // retrurns: Deferred

                this._forgotCredentialPart2Deferred = new Deferred();

                forgotCredentialPart2ViewModelProxy.getObject().then(function(forgotCredentialPart2ViewModel){
                    forgotCredentialPart2ViewModel.passwordRecoveryCode;
                    forgotCredentialPart2ViewModel.name;
                });


                this.forgotCredentialPart2View.activate().then(lang.hitch(this, function(result){
                    // Do nothing if form not valid.
                    if (!result.state == ''){
                        this._forgotCredentialPart2Deferred.resolve();
                    }

                    // Update status
                    this.set('status', new Status('sending password change request', Status.icon.SPINNER));

                    // Send data to server
                    var formValue = result.value;

                    this.get('api').forgotCredentialPart2(formValue['identityName'], formValue['password'][0], formValue['passwordRecoveryCode']).then(
                        lang.hitch(this, '_forgotCredentialPart2Complete'),
                        lang.hitch(this, '_handleException')
                    );
                    this.forgotCredentialPart2View.reset();
                }));

                return this._forgotCredentialPart2Deferred;
            },

            register: function(){
                // summary:
                //		Allow a new identity to register themselves
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

            _forgotCredentialPart1Complete: function(data)
            {
                this.set('status', new Status('password recovery email sent', Status.icon.SUCCESS, 5000));
                this._forgotCredentialPart1Deferred.resolve(true);
            },

            _forgotCredentialPart2Complete: function(data)
            {
                this.set('status', new Status('password changed', Status.icon.SUCCESS, 5000));
                this._forgotCredentialPart2Deferred.resolve(true);
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

                if (this._forgotCredentialPart1Deferred && (! this._forgotCredentialPart1Deferred.isFulfilled())){
                    this._forgotCredentialPart1Deferred.reject(exception);
                }
                if (this._forgotCredentialPart2Deferred && (! this._forgotCredentialPart2Deferred.isFulfilled())){
                    this._forgotCredentialPart2Deferred.reject(exception);
                }
                if (this._registerDeferred && (! this._registerDeferred.isFulfilled())){
                    this._registerDeferred.reject(exception);
                }
            }
        }
    );
});