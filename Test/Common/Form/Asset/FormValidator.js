define([
    'dojo/_base/declare',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/Test/Common/Form/Asset/FormValidator',
        [BaseValidator],
        {
            messages: [],

            isValid: function(value){
                var messages = [];

                var result = true;
                if (value.username != 'Toby'){
                    result = false;
                    messages.push('Username must be Toby');
                }

                this.set('messages', messages);
                return result;
            }
        }
    );
});
