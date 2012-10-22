define([
    'dojo/_base/declare',
    'dojo/dom-prop',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/query',
    'dijit/form/_FormValueMixin',
    'dijit/form/_TextBoxMixin',
    'dojo/NodeList-manipulate'
],
function (
    declare,
    domProp,
    domConstruct,
    domClass,
    query,
    FormValueMixin,
    TextBoxMixin
){
    return declare(
        'Sds/Common/Form/_TextAreaMixin',
        [FormValueMixin, TextBoxMixin],
        {
            postCreate: function(){
                
                if (this.label){
                    domConstruct.create(
                        'label',
                        {innerHTML: this.label, 'class': 'control-label', 'for': this.id},
                        this.domNode,
                        'first'
                    );
                }
                
                //set a class on the textbox
                if (this.inputClass){
                    domClass.add(this.textbox, this.inputClass);
                }
                
                this.inherited(arguments);
            },

            _refreshState: function(){
                // Overrides TextBox._refreshState()
                if(this._created){
                    this.set('value', this.textbox.value);
                }
                this.inherited(arguments);
            },
            
            _setPlaceholderText: function() {
                if(this.placeholder) {
                    domProp.set(this.textbox, 'placeholder', this.placeholder);
                } else if (this.label){
                    domProp.set(this.textbox, 'placeholder', this.label);
                }
            }
        }
    );
});
