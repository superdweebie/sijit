define([
    'dojo/_base/declare',
    'Sds/Validator/Base'
],
function(
    declare,
    Base
){
    return declare(
        'Sds/Test/ModuleManager/Functional/Asset/MultiFieldValidator',
        [Base],
        {

            _isValid: function(value){
                var messages = [];

                var result = true;
                if (value.username != 'Toby'){
                    result = false;
                    messages.push('Username must be Toby');
                }

                return {result: result, messages: messages};
            }
        }
    );
});
