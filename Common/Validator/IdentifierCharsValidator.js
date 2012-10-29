define([
    'dojo/_base/declare',
    'dojo/i18n!Sds/nls/validatorMessages',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    validatorMessages,
    BaseValidator
){
    return declare(
        'Sds/Common/Validator/IdentifierCharsValidator',
        [BaseValidator],
        {
            regEx: /^[a-zA-Z0-9_-]+$/,

            _isValid: function(value){

                var messages = [];
                var result = true;

                if ( ! this.regEx.test(value)){
                    result = false;
                    messages.push(validatorMessages.IdentifierCharsValidatorMessage);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
