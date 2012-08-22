define([
    'dojo/_base/declare',
    'Sds/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/Validator/UsernameValidator',
        [BaseValidator],
        {
            messages: [],

            lengthRegEx: /^.{3,40}$/,

            charRegEx: /^[a-zA-Z0-9]+$/,

            isValid: function(value){
                this.messages = [];

                var result = true;

                if ( ! this.lengthRegEx.test(value)){
                    result = false;
                    this.messages.push('Username must be between 3 and 40 characters long.');
                }
                if ( ! this.charRegEx.test(value)){
                    result = false;
                    this.messages.push('Username must contain only alpha-numeric characters.');
                }

                return result;
            }
        }
    );
});
