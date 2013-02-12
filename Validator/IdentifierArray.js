define([
    'dojo/_base/declare',
    'dojo/string',
    'dojo/i18n!Sds/nls/validatorMessages',
    './Identifier',
    './Base'
],
function(
    declare,
    string,
    validatorMessages,
    Identifier,
    Base
){
    return declare(
        [Base],
        {
            _isValid: function(value){

                var messages = [],
                    validator = new Identifier,
                    result = true,
                    resultObject,
                    name;

                for (var index in value){
                    name = value[index];
                    resultObject = validator.isValid(name);
                    if ( ! resultObject.result){
                        result = false;
                        var identifierMessages = resultObject.messages;
                        for (var messageIndex in identifierMessages){
                            messages.push(string.substitute(
                                validatorMessages.identifierArray,
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
