define([
    'dojo/_base/declare',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/UserModule/Validator/PasswordMatchValidator',
        [BaseValidator],
        {
            isValid: function(value){
                if (value.value){
                    value = value.value;
                }

                this.messages = [];

                var result = true;
                if (value.credential[0] != value.credential[1]) {
                    this.messages.push('Both passwords are not the same.');
                    result = false;
                }
                return result;
            }
        }
    );
});
