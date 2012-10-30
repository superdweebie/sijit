define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/Deferred',
    'dojo/DeferredList',
    'Sds/Common/Validator/BaseValidator',
    'Sds/Common/Validator/validatorFactory'
],
function(
    declare,
    lang,
    array,
    Deferred,
    DeferredList,
    BaseValidator,
    validatorFactory
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

            _fieldValidators: undefined,

            _allValidatorsSet: false,

            consturctor: function(metadata){
                this.set('metadata', metadata);
            },

            _metadataSetter: function(metadata){

                var allValidators = array.map(metadata.fields, lang.hitch(this, function(field, fieldName){
                    var fieldValidatorSet = new Deferred;
                    validatorFactory.create({
                        'class': 'Sds/Common/Validator/FieldValidator',
                        options: {metadata: field}
                    }).then(lang.hitch(this, function(fieldValidator){
                        this._fieldValidators[fieldName] = fieldValidator;
                        fieldValidatorSet.resolve();
                    }));
                    return fieldValidatorSet;
                }));

                var classValidatorSet = new Deferred;
                allValidators.push(classValidatorSet);

                validatorFactory.create({
                    'class': 'Sds/Common/Validator/FieldValidator',
                    options: {metadata: metadata}
                }).then(lang.hitch(this, function(classValidator){
                    this.set('_classValidator', classValidator);
                    classValidatorSet.resolve();
                }));

                var allValidatorsSet = new DeferredList(allValidators);
                allValidatorsSet.then(lang.hitch(this, function(){
                    this.set('_allValidatorsSet', true);
                }));
            },

            _isValid: function(value){

                if (this._allValidatorsSet){
                    return this._checkAllValidators(value);
                }
                    var resultDeferred = new Deferred;
                    this.watch('_allValidatorsSet', lang.hitch(this, function(property, oldValue, newValue){
                        if (newValue){
                            resultDeferred.resolve(this._checkAllValidators(value));
                        }
                    }));

                return resultDeferred;
            },

            _checkAllVaidators: function(value){

                var resultObjects = array.map(this._fieldValidators, function(validator, fieldName){
                    return {result: validator.isValid(value.fieldName), messages: validator.get('messages')};
                });
                resultObjects.push({result: this._classValidator.isValid(value), messages: this._classValidator.get('messages')});

                var deferredResultObjects = array.filter(resultObjects, function(resultObject){
                    if (BaseValidator.isDeferred(resultObject.result)){
                        return true;
                    } else {
                        return false;
                    }
                });

                var messages;
                array.forEach(resultObject, function(resultObject){
                    messages.concat(resultObject.messages);
                });

                if (deferredResultObjects.length == 0){
                    var result = array.every(resultObjects, function(resultObject){
                        return resultObject.result;
                    });
                    return {result: result, messages: messages};
                } else {
                    var deferredResult = new DeferredList(
                        array.map(deferredResultObjects, function(resultObject){
                            return resultObject.result;
                        })
                    );

                    return {result: deferredResult, messages: messages};
                }
            }
        }
    );
});
