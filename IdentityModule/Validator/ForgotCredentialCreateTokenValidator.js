define([
    'dojo/_base/declare',
    'Sds/Validator/Base'
],
function(
    declare,
    Base
){
    return declare(
        'Sds/IdentityModule/Validator/ForgotCredentialCreateTokenValidator',
        [Base],
        {
            _isValid: function(value){

                if (value.value){
                    value = value.value;
                }

                var messages = [];

                var result = true;
                if ( ! value.identityName && ! value.email) {
                    messages.push('Either username or email is required.');
                    result = false;
                }

                return {result: result, messages: messages};
            }
        }
    );
});
