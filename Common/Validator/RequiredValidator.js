define([
    'dojo/_base/declare',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/Common/Validator/RequiredValidator',
        [BaseValidator],
        {

            haltOnFail: true,

            isValid: function(value){
                this.messages = [];

                var result = true;

                if (value === undefined || value === null || value == ''){
                    result = false;
                    this.messages.push('This value is required.');
                }

                return result;
            }
        }
    );
});
