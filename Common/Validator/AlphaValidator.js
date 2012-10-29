define([
    'dojo/_base/declare',
    'dojo/i18n!Sds/nls/validatorMessages',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    validatorMessages,
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

            _isValid: function(value){
                var messages = [];

                var result = true;

                if ( ! this.regEx.test(value)){
                    result = false;
                    messages.push(validatorMessages.alphaValidatorMessage);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
