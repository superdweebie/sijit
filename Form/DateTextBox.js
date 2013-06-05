define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/dom-style',
    'dojo/on',
    'dojo/date/locale',
    './ValidationTextBox',
    'dojo/text!./Template/DateTextBox.html',
    '../Widget/DateDropdown'
],
function (
    declare,
    lang,
    domConstruct,
    domStyle,
    on,
    dateLocale,
    ValidationTextBox,
    template,
    DateDropdown
){
    return declare(
        [ValidationTextBox],
        {

            templateString: template,

            formatLength: 'short', // short | long

            buildRendering: function(){
                this.dateDropdown = new DateDropdown({placement: 'right'});
                this.inherited(arguments);
                this.dateDropdown.set('target', this.dropdownTarget);
            },

            startup: function(){
                this.inherited(arguments);
                this.set('placeholder', this.placeholder);
                this.dateDropdown.startup();
                this.dateDropdown.watch('hidden', lang.hitch(this, '_dateDropdownWatcher'));
            },

            _dateDropdownWatcher: function(property, oldValue, newValue){
                if (newValue){
                    this.set('value', this.dateDropdown.get('value'));
                } else {
                    this.dateDropdown.set('value', this.get('value'));
                }
            },

            _setPlaceholderAttr: function(value){
                if (!value){
                    value = dateLocale._parseInfo().bundle['dateFormat-' + this.formatLength];
                }
                this.inherited(arguments, [value]);
            },

            blurFormat: function(value) {
                return dateLocale.format(value, {selector: 'date', formatLength: this.formatLength});
            }


//            parse: function(value, constraints){
//                return dateLocale.parse(value, lang.mixin({selector: 'date', formatLength: this.formatLength}, constraints));
//            }
        }
    );
});