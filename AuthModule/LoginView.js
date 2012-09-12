define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/Deferred',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/View/BaseView',
    'Sds/AuthModule/ViewModel/Login',
    'Sds/View/FormFactory',
    'Sds/TemplateManager/switch!Sds/AuthModule/Template/[theme]/LoginView'
],
function(
    declare,
    lang,
    when,
    Deferred,
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    BaseView,
    LoginViewModel,
    FormFactory,
    template
){
    return declare(
        'Sds/AuthModule/LoginView',
        [
            Widget,
            TemplatedMixin,
            WidgetsInTemplateMixin,
            BaseView
        ],
        {
            templateString: template,

            // userController: Sds/UserModule/UserControllerInterface | Sds/ServiceManager/Ref
            //     A userController or reference to one
            userController: undefined,

            valueType: LoginViewModel,

            inputsAppended: false,

            activate: function(value){

                this.inherited(arguments);

                if ( ! value){
                    value = new LoginViewModel;
                    this.set('value', value);
                }

                when(this._appendInputs(), lang.hitch(this, function(){
                    this.loginDialogNode.set('value', value);
                    when(this.loginDialogNode.show(), lang.hitch(this, function(){
                        this._resolve();
                    }));
                }));

                return this._activateDeferred;
            },
            reset: function(){
                this.loginDialogNode.reset();
            },
            _appendInputs: function(){
                var appendInputsDeferred = new Deferred;

                if ( ! this.inputsAppened){
                    var formFactory = new FormFactory;
                    var metadata = LoginViewModel.metadata;
                    metadata.containerNode = this.containerNode;
                    when(formFactory.append(this.loginDialogNode, metadata), lang.hitch(this, function(){
                        this.inputsAppened = true;
                        appendInputsDeferred.resolve();
                    }));
                } else {
                    appendInputsDeferred.resolve();
                }
                return appendInputsDeferred;
            },
            _getStateAttr: function(){
                return this.loginDialogNode.get('state');
            },
            _getValueAttr: function(){
                this.value = lang.mixin(this.value, this.loginDialogNode.get('value').value);
                return this.value;
            },
            _onRecoverPassword: function(){
                this.set('state', 'recoverPassword');
                this.loginDialogNode.hide();
                this.userController.recoverPassword();
            },
            _onRegister: function(){
                this.set('state', 'register');
                this.loginDialogNode.hide();
                this.userController.register();
            }
        }
    );
});


