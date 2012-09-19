define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/View/BaseView',
    'Sds/AuthModule/ViewModel/Login',
    'Sds/View/formFactory',
    'dojo/text!./Template/LoginView.html',
    'Sds/Common/Dialog'
],
function(
    declare,
    lang,
    Deferred,
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    BaseView,
    LoginViewModel,
    formFactory,
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

            postCreate: function(){
                this.inherited(arguments);
                document.body.appendChild(this.domNode);
            },

            activate: function(value){

                this.inherited(arguments);

                if ( ! value){
                    value = new LoginViewModel;
                    this.set('value', value);
                }

                this._appendInputs().then(lang.hitch(this, function(){
                    this.dialogNode.set('value', value);
                    this.startup();
                    this.dialogNode.show().then(lang.hitch(this, function(){
                        this._resolve();
                    }));
                }));

                return this._activateDeferred;
            },

            deactivate: function(){
                this.dialogNode.hide();
                this.inherited(arguments);
            },

            reset: function(){
                this.dialogNode.reset();
            },
            _appendInputs: function(){
                var appendInputsDeferred = new Deferred;

                if ( ! this.inputsAppened){
                    var metadata = LoginViewModel.metadata;
                    metadata.containerNode = this.containerNode;
                    formFactory.appendToForm(this.dialogNode, metadata).then(lang.hitch(this, function(){
                        this.inputsAppened = true;
                        appendInputsDeferred.resolve();
                    }));
                } else {
                    appendInputsDeferred.resolve();
                }
                return appendInputsDeferred;
            },
            _getStateAttr: function(){
                return this.dialogNode.get('state');
            },
            _getValueAttr: function(){
                this.value = lang.mixin(this.value, this.dialogNode.get('value').value);
                return this.value;
            },
            onRecoverPassword: function(){
                this.dialogNode.hide();
                this.userController.recoverPassword();
            },
            onRegister: function(){
                this.dialogNode.hide();
                this.userController.register();
            }
        }
    );
});


