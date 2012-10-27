define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dijit/form/_FormValueMixin'
],
function (
    declare,
    lang,
    array,
    domConstruct,
    domClass,
    FormValueMixin
){
    return declare(
        'Sds/Common/Form/Select',
        [FormValueMixin],
        {
            // label: string
            label: undefined,

            buildRendering: function(){
                this.inherited(arguments);

                // Add any options tags to the options array
                var source = this.srcNodeRef;
                if(source && source.options){
                    array.forEach(source.options, lang.hitch(this, function(option){
                        this.addOption(option.value, option.text);
                    }))
                }
                this.set('value', source.value);
            },

            addOption: function(value, text){
                this.select.appendChild(domConstruct.create('option',{value: value, innerHTML: text}));
            },

            _setValueAttr: function(value){
                this.select.value = value;
            },

            _getValueAttr: function(){
                return this.select.value;
            },

            _setOptionsAttr: function(options){
                for (var value in options){
                    this.addOption(value, options[value]);
                }
            },

            _getOptionsAttr: function(){
                var options = {};
                array.forEach(this.select.options, lang.hitch(this, function(option){
                    options[option.value] = option.text;
                }));
                return options;
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
            },
            
            _setInputClassesAttr: function(value){
                this.inputClasses = value;
                for (var index in this.inputClasses){
                    domClass.add(this.select, this.inputClasses[index]);
                }
            }
        }
    )
});
