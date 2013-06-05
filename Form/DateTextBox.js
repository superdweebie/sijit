define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/date/locale',
    './ValidationTextBox',
    'dojo/text!./Template/DateTextBox.html',
    '../Widget/DateDropdown'
],
function (
    declare,
    lang,
    dateLocale,
    ValidationTextBox,
    template,
    DateDropdown
){
    return declare(
        [ValidationTextBox],
        {

            templateString: template,

            formatLength: 'medium', // short | medium | long and more. See dojo/cldr/nls

            placeholder: 'dd/mm/yyyy',

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

            onBlur: function(){
                if (!this.dateDropdown.opening){
                    this.inherited(arguments);
                }
                //this.set('postActivity', true);

                //this.validateNow(); //Force immediate validation on blur, no need to wait for the delay timer.
            },

            blurFormat: function(value) {
                if (typeof value == 'string'){
                    return value;
                } else {
                    return dateLocale.format(value, {selector: 'date', formatLength: this.formatLength});
                }
            },

            parse: function(value){
                if (typeof value == 'string'){
                    return dateLocale.parse(value, lang.mixin({selector: 'date', formatLength: this.formatLength}));
                } else {
                    return value;
                }
            }
        }
    );
});