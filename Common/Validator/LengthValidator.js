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
    return declare(
        'Sds/Common/Validator/LengthValidator',
        [BaseValidator],
        {
            min: 0,

            max: 255,

            constructor: function(min, max){
                this.min = min,
                this.max = max
            },

            _isValid: function(value){

                var messages = [];
                var result = true;
                var regEx = new RegExp('^.{' + this.min + ',' + this.max + '}$');

                if ( ! regEx.test(value)){
                    result = false;
                    messages.push(BaseValidator.formatMessage(
                        validatorMessages.lengthValidatorMessage,
                        {min: this.min, max: this.max}
                    ));
                }

                return {result: result, messages: messages};
            }
        }
    );
});
