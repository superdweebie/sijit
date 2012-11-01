define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'Sds/Common/Validator/BaseValidator',
    'Sds/Common/Validator/validatorFactory'
],
function(
    declare,
    lang,
    Deferred,
    BaseValidator,
    validatorFactory
){
    // module:
    //		Sds/Common/Validator/FieldValidator

    return declare(
        'Sds/Common/Validator/FieldValidator',
        [BaseValidator],
        {
            // summary:
            //		Validator that will validate against validators defined
            //		in metadata for a field.

            metadata: undefined,

            validator: undefined,

            _validatorSet: false,

            _metadataSetter: function(metadata){

                if (metadata.dataType){
                    var dataTypeValidator = {
                        'class': 'Sds/Common/Validator/DatatypeValidator',
                        options: {requiredType: metadata.dataType}
                    };
                    if (!metadata.validator) {
                        metadata.validator = dataTypeValidator;
                    } else if (lang.isArray(metadata.validator)) {
                        metadata.validator.push(dataTypeValidator);
                    } else {
                        metadata.validator = [dataTypeValidator, metadata.validator];
                    }
                }
                this.metadata = metadata;
                validatorFactory.create(this.metadata.validator).then(lang.hitch(this, function(validator){
                    this.set('validator', validator);
                }))
            },

            _validatorSetter: function(validator){
                this.validator = validator;
                this.set('_validatorSet', true);
            },

            _isValid: function(value){

                if (this._validatorSet){
                    return {
                        result: this.validator.isValid(value),
                        messages: this.validator.get('messages')
                    };
                } else {
                    var returnDeferred = new Deferred;
                    var handle = this.watch('_validatorSet', lang.hitch(this, function(property, oldValue, newValue){
                        if (newValue){
                            handle.unwatch('_validatorSet');
                            returnDeferred.resolve({
                                result: this.validator.isValid(value),
                                messages: this.validator.get('messages')
                            });
                        }
                    }));
                    return {result: returnDeferred, messages: []};
                }
            }
        }
    );
});
