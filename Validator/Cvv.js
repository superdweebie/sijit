define([
    'dojo/_base/declare',
    'dojo/i18n!Sds/nls/validatorMessages',
    'Sds/Validator/Base',
    'dojox/validate/creditCard'
],
function(
    declare,
    validatorMessages,
    Base,
    creditCard
){
    return declare(
        'Sds/Validator/Cvv',
        [Base],
        {

            type: 'mc',

            _isValid: function(value){

                var messages = [],
                    result = true;

                if ( ! creditCard.isValidCvv(value, this.type)){
                    result = false;
                    messages.push(validatorMessages.cvvMessage);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
