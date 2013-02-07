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
        'Sds/Validator/IdentifierChars',
        [Base],
        {
            regEx: /^[a-zA-Z0-9_-]+$/,

            _isValid: function(value){

                var messages = [],
                    result = true;

                if ( ! this.regEx.test(value)){
                    result = false;
                    messages.push(validatorMessages.identifierCharsMessage);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
