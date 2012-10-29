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
        'Sds/Common/Validator/CredentialValidator',
        [BaseValidator],
        {
            lengthRegEx: /^.{6,40}$/,

            containAlphaRegEx: /[a-zA-Z]/,

            containNumRegEx: /[0-9]/,

            _isValid: function(value){

                var messages = [];
                var result = true;

                if ( ! this.lengthRegEx.test(value)){
                    result = false;
                    messages.push(validatorMessages.credentialValidatorLengthMessage);
                }

                if ( ! this.containAlphaRegEx.test(value)){
                    result = false;
                    messages.push(validatorMessages.credentialValidatorAlphaMessage);
                }

                if ( ! this.containNumRegEx.test(value)){
                    result = false;
                    messages.push(validatorMessages.credentialValidatorNumMessage);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
