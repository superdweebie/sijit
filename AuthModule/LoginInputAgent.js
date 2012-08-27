define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/dom',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/ServiceManager/SafeGetPropertyMixin',
    'Sds/InputAgent/BaseInputAgent',
    'Sds/AuthModule/InputAgentModel/Login',
    'Sds/ServiceManager/Shared/GetObject!formFactory',
    'dojo/text!./Template/LoginInputAgent.html',
    'Sds/Common/Dialog',
    'Sds/Common/JsLink',
    'dojox/layout/TableContainer',
    'dijit/form/ValidationTextBox'
],
function(
    declare,
    lang,
    when,
    dom,
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    SafeGetPropertyMixin,
    BaseInputAgent,
    LoginInputAgentModel,
    formFactory,
    template
){
    return declare(
        'Sds/AuthModule/LoginInputAgent',
        [
            Widget,
            TemplatedMixin,
            WidgetsInTemplateMixin,
            SafeGetPropertyMixin,
            BaseInputAgent
        ],
        {
            templateString: template,

            // userController: Sds/UserModule/UserControllerInterface | Sds/ServiceManager/Ref
            //     A userController or reference to one
            userController: undefined,

            valueType: LoginInputAgentModel,

            form: undefined,

            activate: function(value){

                if ( ! value){
                    value = new LoginInputAgentModel;
                }

                this.inherited(arguments);

                when(formFactory.create(value, LoginInputAgentModel.metadata), lang.hitch(this, function(form){
                    this.form = form;

                    this.loginDialogNode.set('state', 'Incomplete');
                    form.watch('state', lang.hitch(this, function(property, oldValue, newValue){
                        this.loginDialogNode.set('state', newValue);
                    }));
                    dom.byId('loginFormContainer').appendChild(form.domNode);
                    when(this.loginDialogNode.show(), lang.hitch(this, function(){
                        this._resolve();
                    }));
                }));

                return this._activateDeferred;
            },
            reset: function(){
                if (this.form) {
                    return this.form.reset();
                }
                return null;
            },
            _getValueAttr: function(){
                if (this.form){
                    return this.form.get('value');
                }
                return null;
            },
            _getStateAttr: function(){
                if (this.form){
                    return this.form.get('state');
                }
                return null;
            },
            _onRecoverPassword: function(){
                this.set('state', 'recoverPassword');
                this.loginDialogNode.hide();
                when(this.safeGetProperty('userController'), function(userController){
                    userController.recoverPassword();
                });
            },
            _onRegister: function(){
                this.set('state', 'register');
                this.loginDialogNode.hide();
                when(this.safeGetProperty('userController'), function(userController){
                    userController.register();
                });
            }
        }
    );
});


