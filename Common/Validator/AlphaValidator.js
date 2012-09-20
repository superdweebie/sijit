define([
    'dojo/_base/declare',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    // module:
    //		Sds/Common/Validator/AlphaValidator

    return declare(
        'Sds/Common/Validator/AlphaValidator',
        [BaseValidator],
        {
            // summary:
            //		Validator that will check that the supplied string contains
            //		only alpha characters.

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
