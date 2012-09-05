define([
    'dojo/_base/declare',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/Common/Validator/LengthValidator',
        [BaseValidator],
        {
            regEx: /^[a-zA-Z]+$/,

            isValid: function(value){
                this.messages = [];

                var result = true;

                if ( ! this.regEx.test(value)){
                    result = false;
                    this.messages.push('Must contain only the characters a-z, or A-Z.');
                }

                return result;
            }
        }
    );
});
