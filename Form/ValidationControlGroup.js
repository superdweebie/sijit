define([
    'dojo/_base/declare',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    './_FormMixin',
    './_ValidationMixin',
    './_ValidationMessagesMixin',
    'dojo/text!./Template/ValidationControlGroup.html'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    FormMixin,
    ValidationMixin,
    ValidationMessagesMixin,
    template
){
    return declare(
        'Sds/Form/ValidationControlGroup',
        [Widget, TemplatedMixin, FormMixin, ValidationMixin, ValidationMessagesMixin],
        {
            templateString: template,

            postCreate: function(){
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
