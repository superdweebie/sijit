define([
    'dojo/_base/declare',
    'dojo/i18n!../../nls/identityModule',
    '../../Validator/Base'
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
                if (value.credential[0] != value.credential[1]) {
                    messages.push(il8n.credentialMatch);
                    result = false;
                }
                return {result: result, messages: messages};
            }
        }
    );
});
