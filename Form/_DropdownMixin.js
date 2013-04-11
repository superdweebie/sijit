define([
    'dojo/_base/declare',
    'dojo/_base/event',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/on',
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/dom-class',    
    'dojo/dom-style',
    './_OptionsMixin', 
    'dijit/_FocusMixin'    
],
function (
    declare,
    event,
    lang,
    array,
    on,
    domConstruct,
    domAttr,
    domClass,    
    domStyle,
    OptionsMixin,
    FocusMixin
){
    return declare(
        [FocusMixin, OptionsMixin],
        {

            // placeholder: string
            //placeholder: undefined,

            startup: function(){
                this.inherited(arguments);
                this.set('placeholder');
            },
                       
            _setPlaceholderAttr: function(value) {
                this.placeholder = value;

                if (! this.get('value')){
                    if(this.placeholder) {
                        this.placeholderNode.innerHTML = this.placeholder;
                    } else if (this.label){
                        this.placeholderNode.innerHTML = this.get('label');                    
                    }                    
                }
            },
                        
            addOption: function(value, label){
                var existingOptions = this.get('options'),
                    option,
                    newA,
                    newLI,
                    i;
                    
                if (existingOptions[value]){
                    return;
                }
                
                newA = domConstruct.create('A', {href: value, innerHTML: label});
                
                if (this.sortByLabel){
                    for (i = 0; i < this.optionsList.childNodes.length; i++){
                        option = this.optionsList.childNodes[i];
                        if (option.nodeName == 'LI' && option.childNodes[0].innerHTML > label){
                            newLI = domConstruct.create(
                                'LI',
                                null, 
                                option, 
                                'before'
                            );      
                            break;
                        }
                    }
                }
                if (!newLI){
                    newLI = domConstruct.create(
                        'LI',
                        null, 
                        this.optionsList, 
                        'last'
                    );                    
                }
                
                domConstruct.place(newA, newLI, 'only');
                on(newA, 'click', lang.hitch(this, function(e){
                    event.stop(e);                    
                    this.set('value', value);
                    this.dropdown.set('hidden', true);
                }));
            },

            removeOption: function(value){
                var i, option;
                for (i = 0; i < this.optionsList.childNodes.length; i++){
                    option = this.optionsList.childNodes[i];
                    if (option.nodeName == 'LI' && domAttr.get(option.childNodes[0], 'href') == value){
                        domConstruct.destroy(option);
                        break;
                    }                    
                }
            },

            _getOptionsAttr: function(){
                var options = {};
                array.forEach(this.optionsList.childNodes, lang.hitch(this, function(option){
                    if (option.nodeName == 'LI'){
                        options[domAttr.get(option.childNodes[0], 'href')] = option.childNodes[0].innerHTML;                        
                    }                    
                }));
                return options;
            },
            
            _setValueAttr: function(value){                
                if (value){
                    domAttr.set(this.selectedValue, 'data-value', value);
                    this.placeholderNode.innerHTML = '';
                    this.selectedValue.innerHTML = this.get('options')[value];
                }
                this._set('value', value);
            },
            
            _getValueAttr: function(){
                return domAttr.get(this.selectedValue, 'data-value');
            }
        }
    )
});
