define([
    'dojo/_base/declare',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/Common/Validator/IdentifierCharsValidator',
        [BaseValidator],
        {
            regEx: /^[a-zA-Z0-9_-]+$/,

            isValid: function(value){
                this.messages = [];

                var result = true;

                if ( ! this.regEx.test(value)){
                    result = false;
                    this.messages.push('Must contain only the characters a-z, A-Z, 0-9, _, or -.');
                }

                return result;
            }
        }
    );
});
