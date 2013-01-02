define([
    'dojo/_base/declare',
    'Sds/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/Validator/NotRequiredValidator',
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
