define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/Deferred',
    'dojo/DeferredList',
    'Sds/Common/utils',
    'Sds/Common/Validator/BaseValidator',
    'Sds/Common/Validator/FieldValidator'
],
function(
    declare,
    lang,
    array,
    Deferred,
    DeferredList,
    utils,
    BaseValidator,
    FieldValidator
){
    // module:
    //		Sds/Common/Validator/ModelValidator

    return declare(
        'Sds/Common/Validator/ModelValidator',
        [BaseValidator],
        {
            // summary:
            //		Validator that will validate against validators defined
            //		in metadata for a whole model - each field and class level validators.

            metadata: undefined,

            _classValidator: undefined,

            _fieldValidators: {},

            _validatorsSet: false,

            _metadataSetter: function(metadata){

                for (var fieldName in metadata.fields){
                    this._fieldValidators[fieldName] = new FieldValidator({metadata: metadata.fields[fieldName]});
                }

                this._classValidator = new FieldValidator({metadata: metadata});
                this.set('_validatorsSet', true);
            },

            _isValid: function(value){

                if (this._validatorsSet){
                    return this._checkValidators(value);
                }

                var resultDeferred = new Deferred;
                var handle = this.watch('_validatorsSet', lang.hitch(this, function(property, oldValue, newValue){
                    if (newValue){
                        handle.unwatch('_validatorsSet');
                        resultDeferred.resolve(this._checkValidators(value));
                    }
                }));

                return {result: resultDeferred, messages: []};
            },

            _checkValidators: function(value){


                var resultObjects = {};
                var validator;
                var fieldName;

                for (fieldName in this._fieldValidators){
                    validator = this._fieldValidators[fieldName];
                    resultObjects[fieldName] = {
                        result: validator.isValid(value[fieldName]),
                        messages: validator.get('messages'),
                        validator: validator
                    };
                }
                resultObjects['modelValidator'] = {
                    result: this._classValidator.isValid(value),
                    messages: this._classValidator.get('messages'),
                    validator: this._classValidator
                };

                var resultDeferred;
                var messages;
                var result;

                var resultThen = function(fieldName){
                    resultObjects[fieldName].result.then(function(resolvedResult){
                        resultObjects[fieldName].result = resolvedResult;
                        resultObjects[fieldName].messages = resultObjects[fieldName].validator.get('messages');

                        var stillWaiting = false;
                        result = true;
                        messages = [];
                        for (fieldName in resultObjects){
                            if (utils.isDeferred(resultObjects[fieldName].result)){
                                stillWaiting = true;
                            }
                            if (resultObjects[fieldName].result === false){
                                result = false;
                            }
                            messages = messages.concat(array.map(resultObjects[fieldName].messages, function(message){
                                return fieldName + ': ' + message;
                            }));
                        }
                        if ( ! stillWaiting){
                            resultDeferred.resolve({result: result, messages: messages});
                        }
                    });
                };

                var hasDeferred = false;
                result = true;
                messages = [];
                for (fieldName in resultObjects){
                    if (utils.isDeferred(resultObjects[fieldName].result)){
                        if (! resultDeferred){
                            resultDeferred = new Deferred;
                        }
                        hasDeferred = true;
                        resultThen(fieldName);
                    }
                    if (resultObjects[fieldName].result === false){
                        result = false;
                    }
                    messages = messages.concat(array.map(resultObjects[fieldName].messages, function(message){
                        return fieldName + ': ' + message;
                    }));
                }

                if (hasDeferred){
                    return {result: resultDeferred, messages: messages};
                } else {
                    return {result: result, messages: messages};
                }
            }
        }
    );
});
