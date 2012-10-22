define([
    'dojo/_base/declare',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    // module:
    //		Sds/Common/Validator/CurrencyValidator

    return declare(
        'Sds/Common/Validator/CurrencyValidator',
        [BaseValidator],
        {
            // summary:
            //		Validator that will check that the supplied value contains
            //		only numeric characters.

            regEx: /^\d*\,\d(\.\d+)?$/,

            isValid: function(value){
                this.messages = [];

                var result = true;

                if ( ! this.regEx.test(value)){
                    result = false;
                    this.messages.push('Must contain only numeric values');
                }

                return result;
            }
        }
    );
});
