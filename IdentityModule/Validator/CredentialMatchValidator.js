define([
    'dojo/_base/declare',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/IdentityModule/Validator/CredentialMatchValidator',
        [BaseValidator],
        {
            _isValid: function(value){
                if (value.value){
                    value = value.value;
                }

                var messages = [];

                var result = true;
                if (value.credential[0] != value.credential[1]) {
                    messages.push('Both passwords are not the same.');
                    result = false;
                }
                return {result: result, messages: messages};
            }
        }
    );
});
