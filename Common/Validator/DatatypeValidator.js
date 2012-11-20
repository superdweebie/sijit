define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'dojo/i18n!Sds/nls/validatorMessages',
    'Sds/Common/utils',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    lang,
    string,
    validatorMessages,
    utils,
    BaseValidator
){

    // These are the possible datatypes that can be tested for
    var datatypes = {
        STRING: 'string',
        BOOLEAN: 'boolean',
        INT: 'int',
        FLOAT: 'float',
        HASH: 'hash',
        DATE: 'date',
        TIMESTAMP: 'timestamp',
        BIN: 'bin'
    };

    var validator = declare(
        'Sds/Common/Validator/DatatypeValidator',
        [BaseValidator],
        {
            requiredType: datatypes.STRING,

            _isValid: function(value){
                // Will return true if the value is the required type.
                // Will also return true if the value can be successfully cast into the required type

                var messages = [];
                var result = true;

                switch (this.requiredType) {
                    case datatypes.STRING:
                        if (typeof value != 'string'){
                            result = false;
                        }
                        break;
                    case datatypes.BOOLEAN:
                        break;
                    case datatypes.INT:
                        if ( ! utils.isInt(value)){
                            result = false;
                        }
                        break;
                    case datatypes.FLOAT:
                        if ( ! utils.isFloat(value)){
                            result = false;
                        }
                        break;
                }

                if ( ! result){
                    messages.push(string.substitute(
                        validatorMessages.dataTypeValidatorMessage,
                        {requiredType: this.requiredType}
                    ))
                }

                return {result: result, messages: messages};
            }
        }
    );

    lang.mixin(validator, datatypes);

    return validator;
});
