define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    '../string',
    'dojo/i18n!../nls/validatorMessages',
    '../is',
    './Base'
],
function(
    declare,
    lang,
    string,
    validatorMessages,
    is,
    Base
){

    // These are the possible things that can be tested for
    var types = {
        STRING: 'string',
        BOOLEAN: 'boolean',
        INT: 'int',
        FLOAT: 'float',
        DATE: 'date'
    };

    var validator = declare(
        [Base],
        {
            type: types.STRING,

            _isValid: function(value){
                // Will return true if the value is the required type.
                // Will also return true if the value can be successfully cast into the required type

                var messages = [],
                    result = true;

                switch (this.type) {
                    case types.STRING:
                        if (typeof value != 'string'){
                            result = false;
                        }
                        break;
                    case types.BOOLEAN:
                        break;
                    case types.INT:
                        result = is.isInt(value);
                        break;
                    case types.FLOAT:
                        result = is.isFloat(value);
                        break;
                    case types.DATE:
                        result = is.isDate(value);
                        break;
                }

                if ( ! result){
                    messages.push(string.substitute(
                        validatorMessages.is,
                        {type: this.type}
                    ))
                }

                return {result: result, messages: messages};
            }
        }
    );

    lang.mixin(validator, types);

    return validator;
});
