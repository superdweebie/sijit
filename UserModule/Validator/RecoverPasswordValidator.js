define([
    'dojo/_base/declare',
    'Sds/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/UserModule/Validator/RecoverPasswordValidator',
        [BaseValidator],
        {
            isValid: function(value){

                if (value.value){
                    value = value.value;
                }

                this.messages = [];

                var result = true;
                if ( ! value.username && ! value.email) {
                    this.messages.push('Either username or email is required.');
                    result = false;
                }

                return result;
            }
        }
    );
});
