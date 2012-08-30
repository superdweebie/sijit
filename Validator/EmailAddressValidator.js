define([
    'dojo/_base/declare',
    'Sds/Validator/BaseValidator',
    'dojox/validate/web'
],
function(
    declare,
    BaseValidator,
    xweb
){
    return declare(
        'Sds/Validator/EmailAddressValidator',
        [BaseValidator],
        {
            isValid: function(value){

                this.messages = [];

                var result = true;

                if ( ! xweb.isEmailAddress(value)){
                    result = false;
                    this.messages.push('Must be a valid email address.');
                }

                return result;
            }
        }
    );
});
