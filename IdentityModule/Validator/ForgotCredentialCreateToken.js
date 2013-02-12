define([
    'dojo/_base/declare',
    'dojo/i18n!Sds/nls/identityModule',
    'Sds/Validator/Base'
],
function(
    declare,
    il8n,
    Base
){
    return declare(
        [Base],
        {
            _isValid: function(value){

                if (value.value){
                    value = value.value;
                }

                var messages = [];

                var result = true;
                if ( ! value.identityName && ! value.email) {
                    messages.push(il8n.forgotCredentialCreate);
                    result = false;
                }

                return {result: result, messages: messages};
            }
        }
    );
});
