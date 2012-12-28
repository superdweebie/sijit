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
                if ( ! /^\d\d$/.test(value.month) ||  ! /^\d\d\d\d$/.test(value.year)){
                    result = false;
                    messages.push(validatorMessages.creditCardExpiryValidatorMessage);                    
                }
                
                var month = parseInt(value.month),
                    year = parseInt(value.year),
                    compareMonth = new Date().getUTCMonth(),
                    compareYear = new Date().getUTCFullYear(); 
                    
                // Check date is valid
                if (month < 1 || 
                    month > 12 ||
                    year < compareYear ||
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
