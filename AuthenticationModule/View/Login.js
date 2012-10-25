define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/View/BaseView',
    'Sds/AuthenticationModule/ViewModel/Login',
    'Sds/View/formFactory',
    'Sds/Router/startedRouter!',
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
    router,
    template
){
    return declare(
        'Sds/AuthenticationModule/View/Login',
        [
            Widget,
            TemplatedMixin,
            WidgetsInTemplateMixin,
            BaseView
        ],
        {
            templateString: template,

            valueType: LoginViewModel,

            inputsAppended: false,

            forgotCredentialRoute: undefined,

            registerRoute: undefined,
            
            activate: function(value, enableRememberMe){

                var returnValue = this.inherited(arguments);

                if ( ! value){
                    value = new LoginViewModel;
                    this.set('value', value);
                }

                this._appendInputs(enableRememberMe).then(lang.hitch(this, function(){
                    this.startup();
                    this.dialogNode.show(value).then(lang.hitch(this, function(){
                        this.deactivate();
                    }));
                }));

                document.body.appendChild(this.domNode);
                return returnValue;
            },

            deactivate: function(){
                if(this.dialogNode.get('visible')){
                    this.dialogNode.hide();
                }
                this.inherited(arguments);
            },

            reset: function(){
                this.dialogNode.reset();
            },

            _appendInputs: function(enableRememberMe){
                var appendInputsDeferred = new Deferred;

                if ( ! this.inputsAppened){
                    var metadata = lang.clone(LoginViewModel.metadata);
                    metadata.containerNode = this.containerNode;
                    if ( ! enableRememberMe){
                        delete metadata.fields.rememberMe;
                    }
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
            onForgotCredential: function(){
                this.dialogNode.hide();
                router.go(this.forgotCredentialRoute);
            },
            onRegister: function(){
                this.dialogNode.hide();
                router.go(this.registerRoute);
            }
        }
    );
});


