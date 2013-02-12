define([
    'dojo/_base/declare',
    'dojo/i18n!Sds/nls/validatorMessages',
    './Base',
    'dojox/validate/web'
],
function(
    declare,
    validatorMessages,
    Base,
    xweb
){
    return declare(
        [Base],
        {
            _isValid: function(value){

                var messages = [],
                    result = true;

                if ( ! xweb.isEmailAddress(value)){
                    result = false;
                    messages.push(validatorMessages.email);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
