define([
    'dojo/_base/declare',
    'dojo/i18n!Sds/nls/validatorMessages',
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
        'Sds/Validator/Currency',
        [Base],
        {
            // summary:
            //		Validator that will check that the supplied string contains
            //		no more than two decimal places. This validator is not
            //      for validating loacalised currency strings.

            regEx: /^\d+\.?\d{0,2}$/,

            _isValid: function(value){

                var messages = [],
                    result = true;

                if ( ! this.regEx.test(value)){
                    result = false;
                    messages.push(validatorMessages.currencyMessage);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
