define([
    'dojo/_base/declare',
    'dojo/string',
    'dojo/i18n!Sds/nls/validatorMessages',
    './Base'
],
function(
    declare,
    string,
    validatorMessages,
    Base
){
    return declare(
        [Base],
        {
            min: 0,

            max: 255,

            _isValid: function(value){

                var messages = [],
                    result = true,
                    regEx = new RegExp('^.{' + this.min + ',' + this.max + '}$');

                if ( ! regEx.test(value)){
                    result = false;
                    messages.push(string.substitute(
                        validatorMessages.length,
                        {min: this.min, max: this.max}
                    ));
                }

                return {result: result, messages: messages};
            }
        }
    );
});
