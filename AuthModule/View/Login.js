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
    'dojo/text!../Template/Login.html',
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
        'Sds/AuthModule/View/Login',
        [
            Widget,
            TemplatedMixin,
            WidgetsInTemplateMixin,
            BaseView
        ],
        {
            templateString: template,

            // userController: Sds/UserModule/UserControllerInterface | Sds/ServiceManager/Proxy
            //     A userController or proxy to one
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
                    this.startup();
                    this.dialogNode.show(value).then(lang.hitch(this, function(){
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
                if (this.dialogNode.get('button') == 'ok'){
                    return this.dialogNode.get('state');
                } else {
                    return this.dialogNode.get('button');
                }
            },

            _getValueAttr: function(){
                this.value = lang.mixin(this.value, this.dialogNode.get('value').value);
                return this.value;
            },
            onRecoverPassword: function(){
                this.dialogNode.hide();
                this.userController.recoverPasswordPart1();
            },
            onRegister: function(){
                this.dialogNode.hide();
                this.userController.register();
            }
        }
    );
});


