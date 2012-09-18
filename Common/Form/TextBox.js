define([
    'dojo/_base/declare',
    'dojo/dom-prop',
    'dojo/dom-construct',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'dijit/Form/_FormValueMixin',
    'dijit/Form/_TextBoxMixin',
    'dojo/text!./Template/TextBox.html'
],
function (
    declare,
    domProp,
    domConstruct,
    Widget,
    TemplatedMixin,
    FormValueMixin,
    TextBoxMixin,
    template
){
    return declare(
        'Sds/Common/Form/TextBox',
        [Widget, TemplatedMixin, FormValueMixin, TextBoxMixin],
        {
            templateString: template,

            postCreate: function(){
                if (this.label){
                    domProp.set(this.textbox, 'placeholder', this.label);

                    domConstruct.create(
                        'label',
                        {innerHTML: this.label, 'class': 'control-label', 'for': this.id},
                        this.domNode,
                        'first'
                    );
                }
                this.inherited(arguments);
            }
        }
    );
});
