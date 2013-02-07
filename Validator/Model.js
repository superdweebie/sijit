define([
    'dojo/_base/declare',
    './Group'
],
function(
    declare,
    Group
){
    // module:
    //		Sds/Validator/Model

    return declare(
        'Sds/Validator/Model',
        [Group],
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
