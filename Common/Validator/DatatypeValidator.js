define([
    'dojo/_base/declare',
    'Sds/Common/utils',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
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
            requiredType: undefined,

            constructor: function(requiredType){
                this.requiredType = requiredType;
            },

            isValid: function(value){
                // Will return true if the value is the required type.
                // Will also return true if the value can be successfully cast into the required type

                this.messages = [];

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
                    this.messages.push('Value must be a ' + this.requiredType + '.');
                }
                return result;
            }
        }
    );

    validator.datatypes = datatypes;

    return validator;
});
