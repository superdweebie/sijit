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
        'Sds/Common/Validator/RequiredValidator',
        [BaseValidator],
        {

            haltOnFail: true,

            _isValid: function(value){

                var messages = [];
                var result = true;

                if (value === undefined || value === null || value == ''){
                    result = false;
                    messages.push(validatorMessages.requiredValidatorMessage);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
