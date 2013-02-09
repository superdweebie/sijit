define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/when',
    'Sds/Common/Status',
    'dojo/Stateful',
    'get!Sds/Store/storeManager',
    './DataModel/Identity',
    './DataModel/Identity/ModelValidator',
    './Exception/InvalidArgumentException',
    'proxy!Sds/IdentityModule/View/ForgotCredentialCreateToken',
    'proxy!Sds/IdentityModule/View/ForgotCredentialUpdateToken',
    'proxy!Sds/IdentityModule/View/CreateIdentity',
    'Sds/ExceptionModule/throwEx'
],
function(
    declare,
    lang,
    Deferred,
    when,
    Status,
    Stateful,
    storeManager,
    Identity,
    IdentityValidator,
    InvalidArgumentException,
    forgotCredentialCreateTokenView,
    forgotCredentialUpdateTokenView,
    createIdentityView,
    throwEx
){
    return declare
    (
        'Sds/IdentityModule/IdentityController',
        [Stateful],
        {
            // summary:
            //    Handles Identity CRUD, registration and password recovery

            //status: Sds/Common/Status
            //    An object indicating the current status
            //status: undefined,

            forgotCredential: function(id){
                // summary:
                // If id is supplied, will prompt for new credential.
                // If id is not supplied, will propmt to create new forgotCredential token
                // returns: Deferred
                // Returned deferred will resolve when the prompt is complete.

                if (id){
                    return this._updateForgotCredentialToken(id);
                } else {
                    return this._createForgotCredentialToken();
                }
            },

            cancelForgotCredential: function(){
                forgotCredentialCreateTokenView.deactivate();
                forgotCredentialUpdateTokenView.deactivate();
            },

            _createForgotCredentialToken: function(){

                this._createForgotCredentialDeferred = new Deferred();

                forgotCredentialCreateTokenView.activate().then(lang.hitch(this, function(result){
                    // Do nothing if form not valid.
                    if (result.state != ''){
                        this._createForgotCredentialDeferred.resolve();
                        return;
                    }

                    // Update status
                    this.set('status', new Status('sending password recovery request', Status.icon.SPINNER));

                    // Send data to server
                    when(
                        storeManager.getStore('ForgotCredentialToken').put(result.value),
                        lang.hitch(this, '_createForgotCredentialTokenComplete'),
                        lang.hitch(this, function(exception){
                            this._handleException(exception, this._createForgotCredentialDeferred);
                        })
                    );
                }));

                return this._createForgotCredentialDeferred;
            },

            _createForgotCredentialTokenComplete: function(data)
            {
                this.set('status', new Status('password recovery email sent', Status.icon.SUCCESS, 5000));
                this._createForgotCredentialDeferred.resolve(true);
            },

            _updateForgotCredentialToken: function(code){
                // summary:
                // Prompt for a new
                // password to complete the password recovery process
                // retrurns: Deferred

                this._updateForgotCredentialDeferred = new Deferred();

                forgotCredentialUpdateTokenView.activate().then(lang.hitch(this, function(result){
                    // Do nothing if form not valid.
                    if (result.state != ''){
                        this._updateForgotCredentialDeferred.resolve();
                        return;
                    }

                    // Update status
                    this.set('status', new Status('sending password change request', Status.icon.SPINNER));

                    // Send data to server
                    when(
                        storeManager.getStore('ForgotCredentialToken').put(
                            {
                                code: code,
                                credential: result.value.credential[0]
                            }
                        ),
                        lang.hitch(this, '_updateForgotCredentialTokenComplete'),
                        lang.hitch(this, function(exception){
                            this._handleException(exception, this._updateForgotCredentialDeferred);
                        })
                    )
                }));

                return this._updateForgotCredentialDeferred;
            },

            _updateForgotCredentialTokenComplete: function(data)
            {
                this.set('status', new Status('password changed', Status.icon.SUCCESS, 5000));
                this._updateForgotCredentialDeferred.resolve(true);
            },

            register: function(){
                // summary:
                //		Allow a new identity to register themselves
                // returns: Deferred
                //      Returned deferred will resolve when the registration is complete.

                this._registerDeferred = new Deferred();

                createIdentityView.activate().then(lang.hitch(this, function(result){
                    // Do nothing if form not valid.
                    if (result.state != ''){
                        this._registerDeferred.resolve();
                        return;
                    }

                    // Check that the identity we are about to send to the server is valid.
                    var identityValidator = new IdentityValidator;
                    var validatorResult = identityValidator.isValid(result.value);
                    if ( ! validatorResult.result){
                        this._handleException(
                            new InvalidArgumentException(validatorResult.messages.join(' ')),
                            this._registerDeferred
                        );
                        return;
                    }

                    // Update status
                    this.set('status', new Status('sending registration request', Status.icon.SPINNER));

                    when(
                        storeManager.getStore('Identity').put(result.value),
                        lang.hitch(this, '_registerComplete'),
                        lang.hitch(this, function(exception){
                            this._handleException(exception, this._registerDeferred);
                        })
                    );
                }));

                return this._registerDeferred;
            },

            cancelRegister: function(){
                createIdentityView.deactivate();
            },

            _registerComplete: function(data)
            {
                this.set('status', new Status('registration complete', Status.icon.SUCCESS, 5000));
                this._registerDeferred.resolve(true);
            },

            _handleException: function(exception, deferred){

                throwEx(exception).then(lang.hitch(this, function(standardizedException){
                    // Update status
                    this.set('status', new Status(exception.message, Status.icon.ERROR, 5000));

                    if (deferred && (! deferred.isFulfilled())){
                        deferred.reject(standardizedException);
                    }
                }));
            }
        }
    );
});