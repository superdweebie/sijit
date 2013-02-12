define([
    'dojo/_base/declare',
    'dojo/i18n!Sds/nls/validatorMessages',
    './Base'
],
function(
    declare,
    validatorMessages,
    Base
){
    // module:
    //		Sds/Validator/HexColor

    return declare(
        [Base],
        {
            regEx: /^#[0-9A-F]{6,6}$/,

            _isValid: function(value){

                var messages = [],
                    result = true;

                if ( ! this.regEx.test(value)){
                    result = false;
                    messages.push(validatorMessages.hexColor);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
