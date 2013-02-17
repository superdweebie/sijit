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
                
                var refNode;
                if (this.containerNode) {
                    refNode = this.containerNode;
                } else {
                    refNode = this.domNode;
                }

                this.labelNode = domConstruct.create(
                    'label',
                    {innerHTML: value, 'class': 'control-label', 'for': this.id},
                    refNode,
                    'first'
                );
            }
        }
    );
});
