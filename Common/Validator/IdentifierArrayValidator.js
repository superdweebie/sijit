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
                var resultObject;
                var name;

                for (var index in value){
                    name = value[index];
                    resultObject = validator.isValid(name);
                    if ( ! resultObject.result){
                        result = false;
                        var identifierMessages = resultObject.messages;
                        for (var messageIndex in identifierMessages){
                            messages.push(BaseValidator.formatMessage(
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
