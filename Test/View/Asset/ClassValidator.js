define([
    'dojo/_base/declare',
    'Sds/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/Test/View/Asset/ClassValidator',
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
