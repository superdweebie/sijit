define([
    'dojo/_base/declare',
    'dojo/Stateful'
],
function(
    declare,
    Stateful
){
    // module:
    //		Sds/Common/Validator/BaseValidator

    var BaseValidator = declare(
        'Sds/Common/Validator/BaseValidator',
        [Stateful],
        {
            // summary:
            //		The base Validator module that all other Validator modules
            //		should inherit from.

            // messages: array
            //    An array of strings that indicate why this validator failed.
            messages: [],

            //haltOnPass: boolean
            //     If this validator is part of a ValidatorGroup, setting
            //     to true will stop any Validators after this one
            //     from executing if this validator passes
            haltOnPass: false,

            //haltOnFail: boolean
            //     If this validator is part of a ValidatorGroup, setting
            //     to true will stop any Validators after this one
            //     from executing if this validator fails
            haltOnFail: false,

            //skipOnPass:
            //     If this validator is part of a ValidatorGroup, setting
            //     to true will skip evaluating this validator, if all previous
            //     validators have already evaluated to true
            skipOnPass: false,

            //skipOnFail:
            //     If this validator is part of a ValidatorGroup, setting
            //     to true will skip evaluating this validator, if a previous
            //     validator has already evaluated to false
            skipOnFail: false,

            isValid: function(value){
                // summary:
                //     Should be overridden by ihneriting modules.
                //     Will check if the supplied value is valid or not.
                //     If the value is invalid, should populate the messages array.
                //
                // returns:
                //     boolean

                this.messages = [];

                if(value){
                    return true;
                } else {
                    this.messages.push('Invalid');
                    return false;
                }
            }
        }
    );

    BaseValidator.isValidator = function(validator){
        //summary:
        //     Helper method to determine if a value is an instance of BaseValidator
        //
        // returns:
        //     boolean

        if (validator.isInstanceOf && validator.isInstanceOf(BaseValidator)){
            return true;
        }
        return false;
    }

    return BaseValidator;
});
