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
    //		Sds/Validator/Alpha

    return declare(
        [Base],
        {
            // summary:
            //		Validator that will check that the supplied string contains
            //		only alpha characters.

            regEx: /^[a-zA-Z]+$/,

            _isValid: function(value){

                var messages = [],
                    result = true;

                if ( ! this.regEx.test(value)){
                    result = false;
                    messages.push(validatorMessages.alpha);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
