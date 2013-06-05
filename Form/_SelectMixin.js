define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/on',
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/dom-prop',
    'dojo/dom-style',
    './_OptionsMixin',
    'dijit/_FocusMixin',
    '../Widget/Dropdown'
],
function (
    declare,
    lang,
    array,
    on,
    domConstruct,
    domAttr,
    domProp,
    domStyle,
    OptionsMixin,
    FocusMixin,
    Dropdown
){
    return declare(
        [FocusMixin, OptionsMixin],
        {

            // placeholder: string
            //placeholder: undefined,

            buildRendering: function(){
                this.dropdown = new Dropdown({content: '<ul class="dropdown-menu"></ul>'});
                this.inherited(arguments);
                this.dropdown.set('target', this.dropdownTarget);
            },

            startup: function(){
                this.inherited(arguments);
                this.set('placeholder', this.placeholder);
                this.dropdown.startup();
                this.dropdown.watch('hidden', lang.hitch(this, '_dropdownWatcher'));
            },

            _dropdownWatcher: function(property, oldValue, newValue){
                if (!newValue){
                    domStyle.set(this.dropdown.dropdown, 'width', domStyle.get(this.dropdownTarget, 'width') + 'px');
                }
            },

            _setPlaceholderAttr: function(value) {
                this.placeholder = value;

                if(this.placeholder) {
                    domProp.set(this.textbox, 'placeholder', this.placeholder);
                } else if (this.label){
                    domProp.set(this.textbox, 'placeholder', this.get('label'));
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
                    for (i = 0; i < this.dropdown.dropdown.childNodes.length; i++){
                        option = this.dropdown.dropdown.childNodes[i];
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
                        this.dropdown.dropdown,
                        'last'
                    );
                }

                domConstruct.place(newA, newLI, 'only');
                on(newA, 'click', lang.hitch(this, function(e){
                    e.preventDefault();
                    this.set('value', value);
                    this.dropdown.set('hidden', true);
                }));
            },

            removeOption: function(value){
                var i, option;
                for (i = 0; i < this.dropdown.dropdown.childNodes.length; i++){
                    option = this.dropdown.dropdown.childNodes[i];
                    if (option.nodeName == 'LI' && domAttr.get(option.childNodes[0], 'href') == value){
                        domConstruct.destroy(option);
                        break;
                    }
                }
            },

            _getOptionsAttr: function(){
                var options = {};
                array.forEach(this.dropdown.dropdown.childNodes, lang.hitch(this, function(option){
                    if (option.nodeName == 'LI'){
                        options[domAttr.get(option.childNodes[0], 'href')] = option.childNodes[0].innerHTML;
                    }
                }));
                return options;
            },

            _setValueAttr: function(value){
                if (value){
                    this.textbox.value = this.get('options')[value];
                }
                this._set('value', value);
            },

            _setFocusNodeClassAttr: { node: "textbox", type: "class" }
        }
    )
});
