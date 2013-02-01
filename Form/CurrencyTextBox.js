define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/currency',
    'Sds/Form/ValidationTextBox',
    'Sds/Form/_NumberTextBoxMixin',
    'Sds/Validator/Currency',
    'Sds/Filter/PadCurrency'
],
function (
    declare,
    lang,
    currency,
    ValidationTextBox,
    NumberTextBoxMixin,
    CurrencyValidator,
    PadCurrencyFilter
){
    return declare(
        'Sds/Form/CurrencyTextBox',
        [ValidationTextBox, NumberTextBoxMixin],
        {
            currency: 'USD', //US Dollars default currency

            placeholder: {format: 0},

            validator: [],

            _formatter: currency.format,

            _parser: currency.parse,

            _setCurrencyAttr: function(value){
                this.set('prepend', currency._mixInDefaults({currency: value}).symbol);
            },

            _setPlaceholderAttr: function(value){
                if (value.hasOwnProperty('format')){
                    value = this._formatter(value.format);
                }
                this.inherited(arguments, [value]);
            },

            blurFormat: function(/*Number*/ value, /*number.__FormatOptions*/ constraints){
                // summary:
                //		Formats the value as a Number, according to constraints.
                // tags:
                //		protected
                if (value == '' || value == undefined || value == null){
                    return null;
                }

                return this.inherited(arguments);
            },

            parse: function(/*String*/ value, /*number.__FormatOptions*/ constraints){
                // summary:
                //		Replaceable function to convert a formatted string to a number value
                // tags:
                //		protected extension

                if (value == '' || value == undefined || value == null){
                    return null;
                }

                return this.inherited(arguments);
            },

            _setValidatorAttr: function(value){

                if ( ! lang.isArray(value)){
                    value = [value];
                }
                value.push(new CurrencyValidator);
                this.inherited(arguments, [value]);
            },

            _setFilterAttr: function(value){

                if ( ! lang.isArray(value)){
                    value = [value];
                }
                value.push(new PadCurrencyFilter({currency: this.currency}));
                this.inherited(arguments, [value]);
            }
        }
    );
});

