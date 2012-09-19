define([
    'dojo/_base/declare',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/Test/Common/Form/Asset/ClassValidator',
        [BaseValidator],
        {
            messages: [],

            isValid: function(value){
                this.messages = [];

                var result = true;
                if (value.username != 'Toby'){
                    result = false;
                    this.messages.push('Username must be Toby');
                }
                return result;
            }
        }
    );
});
