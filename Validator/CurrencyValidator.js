define([
    'dojo/_base/declare',
    'dojo/i18n!Sds/nls/validatorMessages',
    'Sds/Validator/BaseValidator'
],
function(
    declare,
    validatorMessages,
    BaseValidator
){
    // module:
    //		Sds/Validator/CurrencyValidator

    return declare(
        'Sds/Validator/CurrencyValidator',
        [BaseValidator],
        {
            // summary:
            //		Validator that will check that the supplied string contains
            //		no more than two decimal places. This validator is not
            //      for validating loacalised currency strings.

            regEx: /^\d+\.?\d{0,2}$/,

            _isValid: function(value){
                var messages = [];

                var result = true;

                if ( ! this.regEx.test(value)){
                    result = false;
                    messages.push(validatorMessages.currencyValidatorMessage);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
