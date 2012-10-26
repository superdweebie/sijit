define([
    'dojo/_base/declare',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/Common/Validator/NotRequiredValidator',
        [BaseValidator],
        {

            _isValid: function(value){

                var result = true;
                this.haltOnPass = false;

                if (value === undefined || value === null || value == ''){
                    this.haltOnPass = true;
                }

                return {result: result, messages: []};
            }
        }
    );
});
