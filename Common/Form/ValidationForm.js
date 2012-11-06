define([
    'dojo/_base/declare',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'Sds/Common/Form/_FormMixin',
    'Sds/Common/Form/_ValidationMixin',
    'dojo/text!./Template/ValidationForm.html'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    FormMixin,
    ValidationMixin,
    template
){
    return declare(
        'Sds/Common/Form/ValidationForm',
        [Widget, TemplatedMixin, FormMixin, ValidationMixin],
        {
            templateString: template,

            suppressMessages: false,

            postCreate: function(){
                this._messageStyleNode = this.formValidatorMessage;
                this.watch('value', function(){
                    this._startValidateTimer();
                });
                this.inherited(arguments);
            },

            _getInvalidWidgetsAttr: function(){
                var result = this.inherited(arguments);
                if (this._getChildrenState() == '' && this.get('state') != ''){
                    result.push(this);
                }
                return result;
            },

            resetActivity: function(){
                this.inherited(arguments);
                for(var index in this._descendants){
                    var widget = this._descendants[index];
                    if (widget.resetActivity){
                        widget.resetActivity();
                    }
                }
            }
        }
    );
});
