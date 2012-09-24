define([
    'dojo/_base/declare',
    'dojo/dom-prop',
    'dojo/dom-construct',
    'dijit/form/_FormValueMixin',
    'dijit/form/_TextBoxMixin'
],
function (
    declare,
    domProp,
    domConstruct,
    FormValueMixin,
    TextBoxMixin
){
    return declare(
        'Sds/Common/Form/_TextBoxMixin',
        [FormValueMixin, TextBoxMixin],
        {
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
            },

            _refreshState: function(){
                // Overrides TextBox._refreshState()
                if(this._created){
                    this.set('value', this.textbox.value);
                }
                this.inherited(arguments);
            }
        }
    );
});
