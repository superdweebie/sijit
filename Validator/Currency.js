define([
    'dojo/_base/declare',
    'dojo/i18n!../nls/validatorMessages',
    './Base'
],
function(
    declare,
    validatorMessages,
    Base
){
    // module:
    //		Sds/Validator/Currency

    return declare(
        [Base],
        {
            // summary:
            //      Note that this validator isn't much good for general purpose currency
            //      checking. It is designed to work in concert with the PadCurrency
            //      filter and the CurrencyTextbox.

            _isValid: function(value){

                var messages = [],
                    result = true;

                if (isNaN(value) && typeof value != 'undefined'){
                    result = false;
                    messages.push(validatorMessages.currency);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
