define([
    'dojo/_base/declare',
    'dojo/i18n!../nls/validatorMessages',
    './Base'
],
function(
    declare,
    validatorMessages,
    Base
){
    return declare(
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
                    messages.push(validatorMessages.credentialLength);
                }

                if ( ! this.containAlphaRegEx.test(value)){
                    result = false;
                    messages.push(validatorMessages.credentialAlpha);
                }

                if ( ! this.containNumRegEx.test(value)){
                    result = false;
                    messages.push(validatorMessages.credentialNum);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
