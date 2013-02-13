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

            type: 'mc',

            _isValid: function(value){

                var messages = [],
                    result = true;

                if ( ! creditCard.isValidCvv(value, this.type)){
                    result = false;
                    messages.push(validatorMessages.cvv);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
