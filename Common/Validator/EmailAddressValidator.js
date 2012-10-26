define([
    'dojo/_base/declare',
    'Sds/Common/Validator/BaseValidator',
    'dojox/validate/web'
],
function(
    declare,
    BaseValidator,
    xweb
){
    return declare(
        'Sds/Common/Validator/EmailAddressValidator',
        [BaseValidator],
        {
            _isValid: function(value){

                var messages = [];
                var result = true;

                if ( ! xweb.isEmailAddress(value)){
                    result = false;
                    messages.push('Must be a valid email address.');
                }

                return {result: result, messages: messages};
            }
        }
    );
});
