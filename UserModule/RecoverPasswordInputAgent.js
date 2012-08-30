define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/Deferred',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/InputAgent/BaseInputAgent',
    'Sds/UserModule/InputAgentModel/RecoverPassword',
    'Sds/InputAgent/FormFactory',
    'dojo/text!./Template/RecoverPasswordInputAgent.html',
    'sds/Common/Dialog',
    'dojox/layout/TableContainer',
    'dijit/form/ValidationTextBox',
    'dojox/validate/regexp'
],
function(
    declare,
    lang,
    when,
    Deferred,
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    BaseInputAgent,
    RecoverPasswordInputAgentModel,
    FormFactory,
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

            valueType: RecoverPasswordInputAgentModel,

            inputsAppended: false,

            activate: function(value){

                this.inherited(arguments);

                if ( ! value){
                    value = new RecoverPasswordInputAgentModel;
                    this.set('value', value);
                }

                when(this._appendInputs(), lang.hitch(this, function(){
                    this.recoverPasswordDialogNode.set('value', value);
                    when(this.recoverPasswordDialogNode.show(), lang.hitch(this, function(){
                        this._resolve();
                    }));
                }));

                return this._activateDeferred;
            },
            reset: function(){
                this.recoverPasswordDialogNode.reset();
            },
            _appendInputs: function(){
                var appendInputsDeferred = new Deferred;

                if ( ! this.inputsAppened){
                    var formFactory = new FormFactory;
                    when(formFactory.append(this.recoverPasswordDialogNode, RecoverPasswordInputAgentModel.metadata, true), lang.hitch(this, function(){
                        this.inputsAppened = true;
                        appendInputsDeferred.resolve();
                    }));
                } else {
                    appendInputsDeferred.resolve();
                }
                return appendInputsDeferred;
            },
            _getStateAttr: function(){
                return this.recoverPasswordDialogNode.get('state');
            },
            _getValueAttr: function(){
                this.value = lang.mixin(this.value, this.recoverPasswordDialogNode.get('value').value);
                return this.value;
            }
        }
    );
});
