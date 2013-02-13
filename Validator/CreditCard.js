define([
    'dojo/_base/declare',
    'dojo/i18n!../nls/validatorMessages',
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
        [Base],
        {

            _isValid: function(value){

                var messages = [],
                    result = true;

                if ( ! creditCard.isValidCreditCardNumber(value)){
                    result = false;
                    messages.push(validatorMessages.creditCard);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
