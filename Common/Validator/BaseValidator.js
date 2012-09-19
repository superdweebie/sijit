define([
    'dojo/_base/declare',
    'dojo/Stateful'
],
function(
    declare,
    Stateful
){
    return declare(
        'Sds/Common/Validator/BaseValidator',
        [Stateful],
        {
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

            isValid: function(value){
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
});
