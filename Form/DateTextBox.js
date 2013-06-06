define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/date/locale',
    '../is',
    './ValidationTextBox',
    'dojo/text!./Template/DateTextBox.html',
    '../Widget/DateDropdown',
    '../Validator/Is',
    '../Validator/Group'
],
function (
    declare,
    lang,
    dateLocale,
    is,
    ValidationTextBox,
    template,
    DateDropdown,
    IsValidator,
    GroupValidator
){
    return declare(
        [ValidationTextBox],
        {

            templateString: template,

            formatLength: 'medium', // short | medium | long and more. See dojo/cldr/nls

            placeholder: 'dd/mm/yyyy',

            validator: [],

            buildRendering: function(){
                this.dateDropdown = new DateDropdown({placement: 'right'});
                this.inherited(arguments);
                this.dateDropdown.set('target', this.dropdownTarget);
            },

            startup: function(){
                this.inherited(arguments);
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
            },

            blurFormat: function(value) {
                return is.isDate(value) ?
                    dateLocale.format(value, {selector: 'date', formatLength: this.formatLength}) :
                    value;
            },

            parse: function(value){
                return is.isDate(value) ?
                    value :
                    dateLocale.parse(value, lang.mixin({selector: 'date', formatLength: this.formatLength}));
            },

            _setValidatorAttr: function(value){

                if (is.isValidator(value) && (value.isInstanceOf(IsValidator) ||
                    value.isInstanceOf(GroupValidator) && value.hasInstanceOf(IsValidator))
                ) {
                    this.inherited(arguments);
                    return;
                }

                if ( ! lang.isArray(value)){
                    value = [value];
                }

                for (var index in value){
                    if (value[index].isInstanceOf && value[index].isInstanceOf(IsValidator)){
                        var has = true;
                        break;
                    }
                }

                if ( ! has){
                    value.push(new IsValidator({type: IsValidator.DATE}));
                }

                this.inherited(arguments, [value]);
            }
        }
    );
});