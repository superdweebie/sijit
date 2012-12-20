define([
    'dojo/_base/declare',
    'dojo/dom-construct'    
],
function (
    declare,
    domConstruct
){
    return declare(
        'Sds/Common/Form/_LabelMixin',
        [],
        {
            // Adds a label to form inputs
            //

            // label: string
            label: undefined,
                                  
            _setLabelAttr: function(value) {
                this.label = value;

                if (this.label){
                    domConstruct.create(
                        'label',
                        {innerHTML: this.label, 'class': 'control-label', 'for': this.id},
                        this.domNode,
                        'first'
                    );
                }
            }            
        }
    );
});
