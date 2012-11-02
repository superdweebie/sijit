define([
    'dojo/_base/declare',
    'Sds/Common/Validator/ValidatorGroup'
],
function(
    declare,
    ValidatorGroup
){
    // module:
    //		Sds/Common/Validator/ModelValidator

    return declare(
        'Sds/Common/Validator/ModelValidator',
        [ValidatorGroup],
        {
            // summary:
            //		Validator that will validate against validators defined
            //		for a whole model - each field and multiField validators.

            _getResultObject: function(validator, value){
                if (validator.field){
                    var resultObject = validator.isValid(value[validator.field]);
                    for (var index in resultObject.messages){
                        resultObject.messages[index] = validator.field + ': ' + resultObject.messages[index];
                    }
                    return resultObject;
                } else {
                    return validator.isValid(value);
                }
            }

        }
    );
});
