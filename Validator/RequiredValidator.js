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
        'Sds/Validator/RequiredValidator',
        [BaseValidator],
        {

            haltOnFail: true,
            
            regEx: /^\s+$/g,

            _isValid: function(value){

                var messages = [];
                var result = true;

                if (value === undefined || value === null || value === '' || this.regEx.test(value)){
                    result = false;
                    messages.push(validatorMessages.requiredValidatorMessage);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
