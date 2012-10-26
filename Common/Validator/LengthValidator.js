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
            min: 0,

            max: 255,

            constructor: function(min, max){
                this.min = min,
                this.max = max
            },

            isValid: function(value){

                var messages = [];
                var result = true;
                var regEx = new RegExp('^.{' + this.min + ',' + this.max + '}$');

                if ( ! regEx.test(value)){
                    result = false;
                    messages.push('Must be between ' + this.min + ' and ' + this.max + ' characters long.');
                }

                this.set('messages', messages);
                return result;
            }
        }
    );
});
