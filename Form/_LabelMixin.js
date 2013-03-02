define([
    'dojo/_base/declare',
    'dojo/dom-construct'
],
function (
    declare,
    domConstruct
){
    return declare(
        [],
        {
            // Adds a label to form inputs
            //

            // label: string
            //label: undefined,

            _setLabelAttr: function(value) {
                this.label = value;

                if (this.labelNode) {
                    this.labelNode.innerHTML = value;
                    return;
                }
                
                this.labelNode = domConstruct.create(
                    'label',
                    {innerHTML: value, 'class': 'control-label', 'for': this.id},
                    this.domNode,
                    'first'
                );
            }
        }
    );
});
