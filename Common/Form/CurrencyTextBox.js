define([
    'dojo/_base/declare',
    'dojo/currency',
    'Sds/Common/utils',
    'Sds/Common/Form/ValidationTextBox',
    'Sds/Common/Form/_NumberTextBoxMixin',
    'get!CurrencyValidator'
],
function (
    declare,
    currency,
    utils,
    ValidationTextBox,
    NumberTextBoxMixin,
    CurrencyValidator
){
    return declare(
        'Sds/Common/Form/CurrencyTextBox',
        [ValidationTextBox, NumberTextBoxMixin],
        {
            currency: 'USD', //US Dollars default currency

            placeholder: {format: 0},

            validator: CurrencyValidator,

            _formatter: currency.format,

            _parser: currency.parse,

            _setCurrencyAttr: function(value){
                this.set('prepend', currency._mixInDefaults({currency: value}).symbol);
            },

            _setPlaceholderAttr: function(value){
                if (value.hasOwnProperty('format')){
                    value = this.blurFormat(value.format);
                }
                this.inherited(arguments, [value]);
            }
        }
    );
});

