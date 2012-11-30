define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'Sds/Store/JsonRest',
    'Sds/Common/Status',
    'dojo/Stateful',
    'Sds/IdentityModule/DataModel/Identity',
    'proxy!Sds/IdentityModule/View/ForgotCredentialCreateToken',
    'proxy!Sds/IdentityModule/View/ForgotCredentialUpdateToken',
    'proxy!Sds/IdentityModule/View/Register',
    'Sds/ExceptionModule/throwEx'
],
function(
    declare,
    lang,
    Deferred,
    JsonRest,
    Status,
    Stateful,
    Identity,
    forgotCredentialCreateTokenView,
    forgotCredentialUpdateTokenView,
    registerView,
    throwEx
){
    return declare
    (
        'Sds/IdentityModule/IdentityController',
        [Stateful],
        {
            // summary:
            //    Handles Identity CRUD, registration and password recovery


            identityRestUrl: undefined,

            identityStore: undefined,

            forgotCredentialTokenRestUrl: undefined,

            forgotCredentialTokenStore: undefined,

            //status: Sds/Common/Status
            //    An object indicating the current status
            status: undefined,

            _identityStoreGetter: function(){
                if (! this.identityStore){
                    this.identityStore = new JsonRest({target: this.identityRestUrl});
                }
                return this.identityStore;
            },

            _forgotCredentialTokenStoreGetter: function(){
                if (! this.forgotCredentialTokenStore){
                    this.forgotCredentialTokenStore = new JsonRest({target: this.forgotCredentialTokenRestUrl});
                }
                return this.forgotCredentialTokenStore;
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
                    if (result.state != ''){
                        this._forgotCredentialPart1Deferred.resolve();
                        return;
                    }

                    // Update status
                    this.set('status', new Status('sending password recovery request', Status.icon.SPINNER));

                    // Send data to server
                    var formValue = result.value;

                    this.get('api').forgotCredentialPart1(formValue['identityName'], formValue['email']).then(
                        lang.hitch(this, '_forgotCredentialPart1Complete'),
                        lang.hitch(this, '_handleException')
                    );
                }));

                return this._forgotCredentialPart1Deferred;
            },

            forgotCredentialPart2: function(){
                // summary:
                //     Prompt for the server generated forgotCredentialCode and a new
                //     password to complete the password recovery process
                // retrurns: Deferred

                this._forgotCredentialPart2Deferred = new Deferred();

                this.forgotCredentialPart2View.activate().then(lang.hitch(this, function(result){
                    // Do nothing if form not valid.
                    if (result.state != ''){
                        this._forgotCredentialPart2Deferred.resolve();
                        return;
                    }

                    // Update status
                    this.set('status', new Status('sending password change request', Status.icon.SPINNER));

                    // Send data to server
                    var formValue = result.value;

                    this.get('api').forgotCredentialPart2(formValue['identityName'], formValue['password'][0], formValue['passwordRecoveryCode']).then(
                        lang.hitch(this, '_forgotCredentialPart2Complete'),
                        lang.hitch(this, '_handleException')
                    );
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
                    if (result.state != ''){
                        this._registerDeferred.resolve();
                        return;
                    }

                    // Update status
                    this.set('status', new Status('sending registration request', Status.icon.SPINNER));

                    this.get('api').register(new Identity(result.value)).then(
                        lang.hitch(this, '_registerComplete'),
                        lang.hitch(this, '_handleRegisterException')
                    );
                }));

                return this._registerDeferred;
            },

            cancelRegister: function(){
                this._registerView.deactivate();
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

                throwEx(exception).then(lang.hitch(this, function(standardizedException){

                    // Update status
                    this.set('status', new Status(standardizedException.message, Status.icon.ERROR, 5000));

                    if (this._forgotCredentialPart1Deferred && (! this._forgotCredentialPart1Deferred.isFulfilled())){
                        this._forgotCredentialPart1Deferred.reject(exception);
                    }
                    if (this._forgotCredentialPart2Deferred && (! this._forgotCredentialPart2Deferred.isFulfilled())){
                        this._forgotCredentialPart2Deferred.reject(exception);
                    }
                }));
            },

            _handleRegisterException: function(exception){
                // summary:
                //		Handles xhr exceptions.

                throwEx(exception).then(lang.hitch(this, function(standardizedException){

                    // Update status
                    this.set('status', new Status(standardizedException.message, Status.icon.ERROR, 5000));

                    standardizedException.handle.then(lang.hitch(this, function(){
                        this.register();
                    }));
                }));
            }
        }
    );
});