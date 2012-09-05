define([
    'dojo/_base/declare',
    'Sds/Common/Validator/IdentifierValidator',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    IdentifierValidator,
    BaseValidator
){
    return declare(
        'Sds/Common/Validator/IdentifierArrayValidator',
        [BaseValidator],
        {
            isValid: function(value){
                this.messages = [];

                var validator = new IdentifierValidator;
                var result = true;
                var name;

                for (var index in value){
                    name = value[index];
                    if ( ! validator.isValid(name)){
                        result = false;
                        var message;
                        var messages = validator.get('messages')
                        for (var messageIndex in messages){
                            message = messages[messageIndex];
                            this.messages.push(name + ' not valid. ' + message);
                        }
                    }
                }

                return result;
            }
        }
    );
});
