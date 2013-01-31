define([
    'dojo/_base/declare',
    'dojo/i18n!Sds/nls/validatorMessages',
    'Sds/Validator/Base'
],
function(
    declare,
    validatorMessages,
    Base
){
    return declare(
        'Sds/Validator/CreditCardExpiry',
        [Base],
        {

            _isValid: function(value){

                var messages = [],
                    result = true;

                // Check fomat
                if ( ! /^\d{1,2}$/.test(value.month) ||  ! /^\d\d\d\d$/.test(value.year)){
                    result = false;
                    messages.push(validatorMessages.creditCardExpiryMessage);
                }

                var month = parseInt(value.month),
                    year = parseInt(value.year),
                    compareMonth = new Date().getUTCMonth() + 1, //getUTCMonth returns a value 0-11, so need to +1
                    compareYear = new Date().getUTCFullYear();

                // Check date is valid
                if (month < 1 ||
                    month > 12 ||
                    year < compareYear ||
                    (year == compareYear && month < compareMonth)
                ) {
                    result = false;
                    messages.push(validatorMessages.creditCardExpiryMessage);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
