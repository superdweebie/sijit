define([
    'dojo/_base/declare',
    'Sds/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/Test/InputAgent/Asset/ClassValidator',
        [BaseValidator],
        {
            messages: [],

            isValid: function(value){
                this.messages = [];

                var result = true;

                return result;
            }
        }
    );
});
