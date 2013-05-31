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
        [FormMixin],
        {
            // Extends the standard dijit/form/_FormMixin
            //
            _getInvalidWidgetsAttr: function(){
                // Returns an array of child widgets which have a state != '' (ie have invalid state)
                return array.filter(this._descendants, function(widget){
                    return (widget.get('state') != '');
                });
            },

            _setInputsAttr: function(/*array*/value){
                //Takes an array of input constructors and appends them to the form
                var input;
                for (var index in value){
                    input = new value[index];
                    this.containerNode.appendChild(input.domNode);
                }
            },

            _getState: function(){
                // summary:
                //		Compute what this.state should be based on state of children
                var states = array.map(this._descendants, function(widget){
                    return widget.get('state') || '';
                });

                if (array.indexOf(states, "Error") >= 0){
                    return 'Error';
                }
                if (array.indexOf(states, "Validating") >= 0){
                    return "Validating";
                }
                if (array.indexOf(states, 'Incomplete') >= 0){
                    return 'Incomplete';
                }
                
                if (array.filter(states, function(state){
                        return (state != '');
                    }).length > 0
                ){
                    return 'Invalid';
                }

                return '';
            }
        }
    );
});
