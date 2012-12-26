define([
    'dojo/_base/declare',
    'Sds/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/Test/Common/Form/Asset/MultiFieldValidator',
        [BaseValidator],
        {

            _isValid: function(value){
                var messages = [];

                var result = true;
                if (value.username1 != value.username2){
                    result = false;
                    messages.push('Username1 must be the same as Username2');
                }

                return {result: result, messages: messages};
            }
        }
    );
});
