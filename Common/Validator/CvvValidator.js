define([
    'dojo/_base/declare',
    'dojo/i18n!Sds/nls/validatorMessages',
    'Sds/Common/Validator/BaseValidator',
    'dojox/validate/creditCard'
],
function(
    declare,
    validatorMessages,
    BaseValidator,
    creditCard
){
    return declare(
        'Sds/Common/Validator/CvvValidator',
        [BaseValidator],
        {
            
            type: 'mc',
    
            _isValid: function(value){

                var messages = [];
                var result = true;

                if ( ! creditCard.isValidCvv(value, this.type)){
                    result = false;
                    messages.push(validatorMessages.cvvValidatorMessage);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
