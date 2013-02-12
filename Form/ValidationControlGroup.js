define([
    'dojo/_base/declare',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    './_FormMixin',
    './_ValidationMixin',
    './_ValidationMessagesMixin'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    FormMixin,
    ValidationMixin,
    ValidationMessagesMixin
){
    return declare(
        [Widget, TemplatedMixin, FormMixin, ValidationMixin, ValidationMessagesMixin],
        {
            templateString: '<div data-dojo-attach-point="containerNode" class="control-group"></div>',

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
