define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dijit/form/_FormMixin'
],
function (
    declare,
    array,
    FormMixin
){
    return declare(
        'Sds/Common/Form/_FormMixin',
        [FormMixin],
        {
            // Extends the standard dijit/form/_FormMixin
            //
            _getInvalidWidgetsAttr: function(){
                // Returns an array of child widgets which have a state != '' (ie have invalid state)
                return array.filter(this._descendants, function(widget){
                    if (widget.get('state') != ''){
                        return true;
                    } else {
                        return false;
                    }
                });
            },

            _setInputsAttr: function(/*array*/value){
                //Takes an array of input constructors and appends them to the form
                var input;
                for (var index in value){
                    input = new value[index];
                    this.containerNode.appendChild(input.domNode);
                }
            }
        }
    );
});
