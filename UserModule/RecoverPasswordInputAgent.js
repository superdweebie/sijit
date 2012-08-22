define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dijit/registry',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/InputAgent/BaseInputAgent',
    'Sds/UserModule/InputAgentModel/RecoverPassword',
    'dojo/text!./templates/RecoverPasswordDialog.html',
    'sds/Common/Dialog',
    'dojox/layout/TableContainer',
    'dijit/form/ValidationTextBox',
    'dojox/validate/regexp'
],
function(
    declare,
    lang,
    when,
    registry,
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    BaseInputAgent,
    RecoverPasswordModel,
    template
){
    return declare(
        'Sds/UserModule/RecoverPasswordInputAgent',
        [
            Widget,
            TemplatedMixin,
            WidgetsInTemplateMixin,
            BaseInputAgent
        ],
        {
            templateString: template,

            valueType: RecoverPasswordModel,

            activate: function(){

                this.inherited(arguments);

                when(this.recoverPasswordDialogNode.show(), lang.hitch(this, function(){
                    this._resolve();
                }));

                return this._activateDeferred;
            },
            reset: function(){
                return this.recoverPasswordDialogNode.reset();
            },
            _getValueAttr: function(){
                return this.recoverPasswordDialogNode.get('value');
            },
            _getStateAttr: function(){
                return this.recoverPasswordDialogNode.get('state');
            },
            validator: function(){
                var username = registry.byId('passwordRecoveryUsername');
                var email = registry.byId('passwordRecoveryEmail');
                if ((username.get('value') && username.isValid()) ||
                    (email.get('value') && email.isValid())){
                    return '';
                }
                return 'Incomplete';
            }
        }
    );
});
