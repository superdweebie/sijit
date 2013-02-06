define([
    'dojo/_base/declare',
    'dojo/dom-construct'
],
function (
    declare,
    domConstruct
){
    return declare(
        'Sds/Form/_LabelMixin',
        [],
        {
            // Adds a label to form inputs
            //

            // label: string
            label: undefined,

            _setLabelAttr: function(value) {
                this.label = value;

                var labelNode;
                if (this.labelNode) {
                    labelNode = this.labelNode;
                } else if (this.containerNode) {
                    labelNode = this.containerNode;
                } else {
                    labelNode = this.domNode;
                }

                if (this.label){
                    domConstruct.create(
                        'label',
                        {innerHTML: this.label, 'class': 'control-label', 'for': this.id},
                        labelNode,
                        'first'
                    );
                }
            }
        }
    );
});
