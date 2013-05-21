define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/currency',
    './ValidationTextBox',
    './_NumberTextBoxMixin',
    '../Validator/Base',
    '../Validator/Currency',
    '../Validator/Group',
    '../Filter/PadCurrency'
],
function (
    declare,
    lang,
    currency,
    ValidationTextBox,
    NumberTextBoxMixin,
    BaseValidator,
    CurrencyValidator,
    GroupValidator,
    PadCurrencyFilter
){
    return declare(
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

                if (BaseValidator.isValidator(value) && (value.isInstanceOf(CurrencyValidator) ||
                            value.isInstanceOf(GroupValidator) && value.hasInstanceOf(CurrencyValidator))
                ) {
                    this.inherited(arguments);                              
                    return;
                }
                      
                if ( ! lang.isArray(value)){
                    value = [value];
                }
                
                for (var index in value){
                    if (value[index].isInstanceOf && value[index].isInstanceOf(CurrencyValidator)){
                        var has = true;
                        break;
                    }
                }
                
                if ( ! has){
                    value.push(new CurrencyValidator);
                }

                this.inherited(arguments, [value]);
            },

            _setFilterAttr: function(value){

                if ( ! lang.isArray(value)){
                    value = [value];
                }
                value.push(new PadCurrencyFilter({currency: this.currency}));
                this.inherited(arguments, [value]);
            }//,
            
//            _getValueToValidate: function(){
//                var value = this.get('value');
//                if (value == null){
//                    return 0;
//                }
//                return
//                return this.textbox.value;
//            }            
        }
    );
});

