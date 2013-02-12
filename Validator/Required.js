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
    return declare(
        [Base],
        {

            haltOnFail: true,

            regEx: /^\s+$/g,

            _isValid: function(value){

                var messages = [],
                    result = true;

                if (value === undefined || value === null || value === '' || this.regEx.test(value)){
                    result = false;
                    messages.push(validatorMessages.required);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
