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
    return declare(
        'Sds/Validator/CreditCardExpiryValidator',
        [BaseValidator],
        {
                        
            _isValid: function(value){
                
                var messages = [],
                    result = true;
                                      
                // Check fomat
                if ( ! /^\d\d\d\d$/.test(value)){
                    result = false;
                    messages.push(validatorMessages.creditCardExpiryValidatorMessage);                    
                }
                
                var month = parseInt(value.substring(0,2)),
                    year = parseInt(value.substring(2)),
                    compareMonth = new Date().getUTCMonth(),
                    compareYear = parseInt((new Date().getUTCFullYear() + '').substring(2)); 
                    
                // Check date is valid
                if (year < compareYear ||
                    (year == compareYear && month < compareMonth)
                ) {
                    result = false;                    
                    messages.push(validatorMessages.creditCardExpiryValidatorMessage);                      
                }
                
                return {result: result, messages: messages};
            }
        }
    );
});
