define([
    'dojo/_base/declare',
    'dojo/i18n!Sds/nls/validatorMessages',
    'Sds/Common/Validator/BaseValidator',
    'dojox/validate/web'
],
function(
    declare,
    validatorMessages,
    BaseValidator,
    xweb
){
    return declare(
        'Sds/Common/Validator/EmailAddressValidator',
        [BaseValidator],
        {
            _isValid: function(value){

                var messages = [];
                var result = true;

                if ( ! xweb.isEmailAddress(value)){
                    result = false;
                    messages.push(validatorMessages.emailValidatorMessage);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
