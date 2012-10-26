define([
    'dojo/_base/declare',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
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
                    messages.push('Must be between 6 and 40 characters long.');
                }

                if ( ! this.containAlphaRegEx.test(value)){
                    result = false;
                    messages.push('Must contain at least one alpha character.');
                }

                if ( ! this.containNumRegEx.test(value)){
                    result = false;
                    messages.push('Must contain at least one numeric character.');
                }

                return {result: result, messages: messages};
            }
        }
    );
});
