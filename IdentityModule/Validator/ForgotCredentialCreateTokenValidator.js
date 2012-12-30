define([
    'dojo/_base/declare',
    'Sds/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/IdentityModule/Validator/ForgotCredentialCreateTokenValidator',
        [BaseValidator],
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
