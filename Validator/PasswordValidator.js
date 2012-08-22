define([
    'dojo/_base/declare',
    'Sds/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/Validator/PasswordValidator',
        [BaseValidator],
        {
            messages: [],

            lengthRegEx: /^.{6,40}$/,

            containAlphaRegEx: /[a-zA-Z]/,

            containNumRegEx: /[0-9]/,

            isValid: function(value){
                this.messages = [];

                var result = true;
                if ( ! this.lengthRegEx.test(value)){
                    result = false;
                    this.messages.push('Password must be between 6 and 40 characters long.');
                }

                if ( ! this.containAlphaRegEx.test(value)){
                    result = false;
                    this.messages.push('Password must contain at least one alpha character.');
                }

                if ( ! this.containNumRegEx.test(value)){
                    result = false;
                    this.messages.push('Password must contain at least one numeric character.');
                }

                return result;
            }
        }
    );
});
