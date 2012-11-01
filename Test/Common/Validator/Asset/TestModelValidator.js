define([
    'dojo/_base/declare',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/Test/Common/Validator/Asset/TestModelValidator',
        [BaseValidator],
        {
            name: undefined,

            constructor: function(name){
                this.name = name
            },

            _isValid: function(value){

                var messages = [];
                var result = true;

                if (value.firstname != this.name){
                    result = false;
                    messages.push('Firstname must be miriam');
                }

                return {result: result, messages: messages};
            }
        }
    );
});
