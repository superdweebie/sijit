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

                var messages = [];
                var validator = new IdentifierValidator;
                var result = true;
                var name;

                for (var index in value){
                    name = value[index];
                    if ( ! validator.isValid(name)){
                        result = false;
                        var identifierMessages = validator.get('messages')
                        for (var messageIndex in identifierMessages){
                            this.messages.push(name + ' not valid. ' + identifierMessages[messageIndex]);
                        }
                    }
                }

                this.set('messages', messages);
                return result;
            }
        }
    );
});
