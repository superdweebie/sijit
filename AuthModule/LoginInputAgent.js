define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/ServiceManager/SafeGetPropertyMixin',
    'Sds/InputAgent/BaseInputAgent',
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
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    SafeGetPropertyMixin,
    BaseInputAgent,
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

            // userController: Sds.UserModule.UserControllerInterface | Sds.ServiceManager.Ref
            //     A userController or reference to one
            userController: undefined,

            valueType: Object,

            activate: function(){

                this.inherited(arguments);

                when(this.loginDialogNode.show(), lang.hitch(this, function(){
                    this._resolve();
                }));

                return this._activateDeferred;
            },
            reset: function(){
                return this.loginDialogNode.reset();
            },
            _getValueAttr: function(){
                return this.loginDialogNode.get('value');
            },
            _getStateAttr: function(){
                return this.loginDialogNode.get('state');
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


