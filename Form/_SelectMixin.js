define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/on',    
    'dojo/dom-construct',
    './_OptionsMixin'
],
function (
    declare,
    lang,
    array,
    on,
    domConstruct,
    OptionsMixin
){
    return declare(
        [OptionsMixin],
        {

            startup: function(){
                this.inherited(arguments);
                on(this.select, 'change', lang.hitch(this, function(e){
                    this.set('value', e.target.value);
                }));
            },
            
            addOption: function(value, label){
                var existingOptions = this.get('options');
                if ( ! existingOptions[value]){
                    if (this.sortByLabel){
                        var created = false;
                        array.forEach(this.select.options, lang.hitch(this, function(option){
                            if ( ! created && option.text > label){
                                domConstruct.create('option',{value: value, innerHTML: label}, option, 'before');
                                created = true;
                            }
                        }));
                        if ( ! created){
                            domConstruct.create('option',{value: value, innerHTML: label}, this.select, 'last');
                        }
                    } else {
                        domConstruct.create('option',{value: value, innerHTML: label}, this.select, 'last');
                    }
                }
            },

            removeOption: function(value){
                var i, option;
                for (i = 0; i < this.select.options.length; i++){
                    option = this.select.options[i];
                    if (option && option.value == value){
                        domConstruct.destroy(option);
                        break;
                    }                    
                }                
            },

            _setValueAttr: function(value){
                this.inherited(arguments);
                this.select.value = value;
            },
            
            _getOptionsAttr: function(){
                var options = {};
                array.forEach(this.select.options, lang.hitch(this, function(option){
                    options[option.value] = option.text;
                }));
                return options;
            }
        }
    )
});
