define([
    'dojo/_base/declare',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/UserModule/Validator/RecoverPasswordPart1Validator',
        [BaseValidator],
        {
            isValid: function(value){

                if (value.value){
                    value = value.value;
                }

                this.messages = [];

                var result = true;
                if ( ! value.name && ! value.email) {
                    this.messages.push('Either username or email is required.');
                    result = false;
                }

                return result;
            }
        }
    );
});
