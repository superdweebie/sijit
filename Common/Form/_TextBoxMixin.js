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
        'Sds/Common/Form/_TextBoxMixin',
        [FormValueMixin, TextBoxMixin],
        {
            postCreate: function(){
                this._setPlaceholderText();
                
                this._setAppendages();
                
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
            
            _setAppendages: function() {
                if (this.prepend || this.append) {
                    //create wrapper element
                    var wrapper = domConstruct.create("div");
                    
                    // add classes to wrapper
                    if(this.prepend) {
                        domClass.add(wrapper,'input-prepend');
                    }
                    
                    if(this.append) {
                        domClass.add(wrapper,'input-append');
                    }
                    
                    //wrap the input
                    query(this.textbox).wrap(wrapper);
                    
                    //add the appendages
                    if(this.prepend) {
                        domConstruct.create(
                            'span',
                            {innerHTML: this.prepend, 'class': 'add-on'},
                            this.textbox,
                            'before'
                        );
                    }
                    
                    if(this.append) {
                        domConstruct.create(
                            'span',
                            {innerHTML: this.append, 'class': 'add-on'},
                            this.textbox,
                            'after'
                        );
                    }
                }
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
