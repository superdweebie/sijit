define([
    'dojo/_base/declare',
    'dojo/dom-prop',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dijit/form/_FormValueMixin',
    'dijit/form/_TextBoxMixin'
],
function (
    declare,
    domProp,
    domConstruct,
    domClass,
    FormValueMixin,
    TextBoxMixin
){
    return declare(
        'Sds/Common/Form/_TextBoxMixin',
        [FormValueMixin, TextBoxMixin],
        {

            // inputClasses: array
            //      An array of css classes to be applied directly to the native input tag
            inputClasses: [],

            // placeholder: string
            placeholder: undefined,

            // label: string
            label: undefined,

            _refreshState: function(){
                // Overrides TextBox._refreshState()
                if(this._created){
                    this.set('value', this.textbox.value);
                }
                this.inherited(arguments);
            },

            _setPlaceholderAttr: function(value) {
                this.placeholder = value;

                if(this.placeholder) {
                    domProp.set(this.textbox, 'placeholder', this.placeholder);
                } else if (this.label){
                    domProp.set(this.textbox, 'placeholder', this.label);
                }
            },

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
                if (!this.placeholder){
                    domProp.set(this.textbox, 'placeholder', this.label);
                }
            },

            _setInputClassesAttr: function(value){
                this.inputClasses = value;
                for (var index in this.inputClasses){
                    domClass.add(this.textbox, this.inputClasses[index]);
                }
            }
        }
    );
});
