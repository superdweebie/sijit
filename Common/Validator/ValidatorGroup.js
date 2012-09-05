define([
    'dojo/_base/declare',
    'Sds/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/Validator/ValidatorGroup',
        [BaseValidator],
        {
            validators: [],

            constructor: function(validators){
                if (validators){
                    this.validators = validators;
                }
            },

            isValid: function(value){
                this.messages = [];

                var result = true;

                for (var index in this.validators){
                    var validator = this.validators[index];
                    if ( ! validator.isValid(value)){
                        result = false;
                        this.messages = this.messages.concat(validator.get('messages'));
                    }
                }

                return result;
            }
        }
    );
});
