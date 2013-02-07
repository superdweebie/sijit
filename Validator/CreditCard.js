define([
    'dojo/_base/declare',
    'dojo/i18n!Sds/nls/validatorMessages',
    './Base',
    'dojox/validate/creditCard'
],
function(
    declare,
    validatorMessages,
    Base,
    creditCard
){
    return declare(
        'Sds/Validator/CreditCard',
        [Base],
        {

            _isValid: function(value){

                var messages = [],
                    result = true;

                if ( ! creditCard.isValidCreditCardNumber(value)){
                    result = false;
                    messages.push(validatorMessages.creditCardMessage);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
