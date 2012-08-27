define([
    'dojo/_base/declare',
    'Sds/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/AuthModule/Validator/LoginPasswordValidator',
        [BaseValidator],
        {
            messages: [],

            lengthRegEx: /^.{3,40}$/,

            isValid: function(value){
                this.messages = [];

                var result = true;

                if ( ! this.lengthRegEx.test(value)){
                    result = false;
                    this.messages.push('Password must be between 3 and 40 characters long.');
                }

                return result;
            }
        }
    );
});
