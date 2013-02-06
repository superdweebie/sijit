define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/when',
    'Sds/Common/Status',
    'dojo/Stateful',
    'get!Sds/Store/storeManager',
    'Sds/IdentityModule/DataModel/Identity',
    'Sds/IdentityModule/DataModel/Identity/ModelValidator',
    'Sds/IdentityModule/Exception/InvalidArgumentException',
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
                        this._registerException(new InvalidArgumentException(validatorResult.messages.join(' ')));
                        return;
                    }

                    // Update status
                    this.set('status', new Status('sending registration request', Status.icon.SPINNER));

                    when(
                        storeManager.getStore('Identity').put(result.value),
                        lang.hitch(this, '_registerComplete'),
                        lang.hitch(this, '_registerException')
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

            _registerException: function(exception){
                throwEx(exception).then(lang.hitch(this, function(standardizedException){
                    this._handleException(standardizedException);

                    if (this._registerDeferred && (! this._registerDeferred.isFulfilled())){
                        this._registerDeferred.reject(standardizedException);
                    }
                }));
            },

            _handleException: function(exception){

                // Update status
                this.set('status', new Status(exception.message, Status.icon.ERROR, 5000));
            }
        }
    );
});