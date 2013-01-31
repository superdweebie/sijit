define([
    'dojo/_base/declare',
    'Sds/Validator/Base'
],
function(
    declare,
    Base
){
    return declare(
        'Sds/Test/Form/Asset/MultiFieldValidator',
        [Base],
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
