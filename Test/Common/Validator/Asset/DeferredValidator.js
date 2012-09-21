define([
    'dojo/_base/declare',
    'dojo/Deferred',
    'Sds/Common/Validator/BaseValidator',
],
function(
    declare,
    Deferred,
    BaseValidator
){
    // module:
    //		Sds/Test/Common/Validator/DeferredValidator

    return declare(
        'Sds/Test/Common/Validator/DeferredValidator',
        [BaseValidator],
        {

            isValid: function(value){
                this.messages = [];

                var result = new Deferred;

                if ( ! value){
                    this.messages.push('Invalid');
                    result.resolve(false);     
                } else {
                    result.resolve(true);
                }

                return result;
            }
        }
    );
});
