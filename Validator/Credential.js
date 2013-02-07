define([
    'dojo/_base/declare',
    'dojo/i18n!Sds/nls/validatorMessages',
    './Base'
],
function(
    declare,
    validatorMessages,
    Base
){
    return declare(
        'Sds/Validator/Credential',
        [Base],
        {
            lengthRegEx: /^.{6,40}$/,

            containAlphaRegEx: /[a-zA-Z]/,

            containNumRegEx: /[0-9]/,

            _isValid: function(value){

                var messages = [],
                    result = true;

                if ( ! this.lengthRegEx.test(value)){
                    result = false;
                    messages.push(validatorMessages.credentialLengthMessage);
                }

                if ( ! this.containAlphaRegEx.test(value)){
                    result = false;
                    messages.push(validatorMessages.credentialAlphaMessage);
                }

                if ( ! this.containNumRegEx.test(value)){
                    result = false;
                    messages.push(validatorMessages.credentialNumMessage);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
