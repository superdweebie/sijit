define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/when',
    'dojox/rpc/Service',
    'dojox/rpc/JsonRPC',
    'dojo/store/JsonRest',
    'dojo/Stateful'
],
function(
    declare,
    lang,
    Deferred,
    when,
    RpcService,
    JsonRpc,
    JsonRest,
    Stateful
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

            userApiSmd: undefined,

            userApi: undefined,

            // recoverPasswordForm: Sds.UserModule.RecoverPasswordFormInterface | sijit.ServiceManager.Ref
            //     A recover password form, or reference to a recover password form.
            recoverPasswordForm: undefined,

            // registerForm: Sds.UserModule.RegisterFormInterface | sijit.ServiceManager.Ref
            //     A register form, or reference to a register form.
            registerForm: undefined,

            getUserStore: function(){
                if ( ! this.userStore) {
                    this.userStore = new JsonRest({target: this.userStoreUrl});
                }
                return this.userStore;
            },
            getUserApi: function() {
                if ( ! this.userApi) {
                    this.userApi = new RpcService(this.userApiSmd);
                }
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

                when(this._activateRecoverPasswordForm(), lang.hitch(this, function(){
                    this._processRecoverPasswordFormData();
                }));

                return this._recoverPasswordDeferred;
            },
            _activateRecoverPasswordForm: function(){
                // summary:
                //		Prompt for password recovery details
                // returns: Deferred
                //      Returned deferred will resolve when the
                //      form is complete.

                // The actual form activation
                var formDeferred = new Deferred;

                when(this.safeGetProperty('loginForm'), function(loginForm){
                    when(loginForm.activate(), function(){
                        formDeferred.resolve();
                    });
                });

                return formDeferred;

                if (this.recoverPasswordDialog.show == undefined){
                    this.recoverPasswordDialog.use(lang.hitch(this, function(recoverPasswordDialog){
                        this.recoverPasswordDialog = recoverPasswordDialog;
                        this.showRecoverPasswordForm();
                    }));
                    return;
                }
                when(this.recoverPasswordDialog.show(), lang.hitch(this, function()
                {
                    var formValues = this.recoverPasswordDialog.getFormValue();
                    this._setStatus({message: 'recovering password', icon: 'spinner'});
                    this.authApi.recoverPassword(formValues['username'], formValues['email']).then(
                        lang.hitch(this, 'recoverPasswordComplete'),
                        lang.hitch(this, 'recoverPasswordError')
                    );
                    this.recoverPasswordDialog.resetForm();
                }));
            },
            recoverPasswordComplete: function(data)
            {
                this._setStatus({message: 'recover password complete', icon: 'success', timeout: 5000});
                this._recoverPasswordDeferred.resolve(true);
            },
            recoverPasswordError: function(error)
            {
                this.errorService.use(function(errorService){
                    errorService.handle(error);
                });
                this._recoverPasswordDeferred.resolve(false);
            },
            register: function(){
                this.showRegisterForm();
                this._registerDeferred = new Deferred();
                return this._registerDeferred;
            },
            showRegisterForm: function()
            {
                if (this.registerDialog.show == undefined){
                    this.registerDialog.use(lang.hitch(this, function(registerDialog){
                        this.registerDialog = registerDialog;
                        this.showRegisterForm();
                    }));
                    return;
                }
                when(this.registerDialog.show(), lang.hitch(this, function()
                {
                    var formValues = this.registerDialog.getFormValue();
                    this._setStatus({message: 'registering new user', icon: 'spinner'});
                    this.authApi.register(formValues['username'], formValues).then(
                        lang.hitch(this, 'registerComplete'),
                        lang.hitch(this, 'registerError')
                    );
                    this.registerDialog.resetForm();
                }));
            },
            registerComplete: function(data)
            {
                this._setStatus({message: 'registration complete', icon: 'success', timeout: 5000});
                this._registerDeferred.resolve(true);
            },
            registerError: function(error)
            {
                this.errorService.use(function(errorService){
                    errorService.handle(error);
                });
                this._registerDeferred.resolve(false);
            },
            refreshPage: function(){
                if(this.config.pageRefreshTarget){
                    this.pageLoaderService.use(lang.hitch(this, function(pageLoaderService){
                        pageLoaderService.refreshPage(this.config.pageRefreshTarget);
                    }));
                }
            },
            _setStatus: function(status){
                this.status.set('status', status);
            }
        }
    );
});