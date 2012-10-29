define([
    'dojo/_base/declare',
    'dojo/i18n!Sds/nls/validatorMessages',
    'Sds/Common/Validator/IdentifierValidator',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    validatorMessages,
    IdentifierValidator,
    BaseValidator
){
    return declare(
        'Sds/Common/Validator/IdentifierArrayValidator',
        [BaseValidator],
        {
            _isValid: function(value){

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
                            this.messages.push(BaseValidator.formatMessage(
                                validatorMessages.identifierArrayValidatorMessage,
                                {name: name, message: identifierMessages[messageIndex]}
                            ));
                        }
                    }
                }

                return {result: result, messages: messages};
            }
        }
    );
});
