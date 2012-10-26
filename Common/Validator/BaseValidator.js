define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/Stateful'
],
function(
    declare,
    lang,
    Deferred,
    Stateful
){
    // module:
    //		Sds/Common/Validator/BaseValidator

    var isDeferred = function(object){
        //summary:
        //     Helper method to determine if an object is an instance of Deferred
        //
        // returns:
        //     boolean

        if (object instanceof Deferred){
            return true;
        }
        return false;
    };

    var BaseValidator = declare(
        'Sds/Common/Validator/BaseValidator',
        [Stateful],
        {
            // summary:
            //		The base Validator module that all other Validator modules
            //		should inherit from.

            // messages: array
            //    An array of strings that indicate why this validator failed, or success
            //    messages if the validation passed.
            messages: [],

            // valueString: string
            _valueString: undefined,

            //haltOnPass: boolean
            //     If this validator is part of a ValidatorGroup, setting
            //     to true will stop any Validators after this one
            //     from executing if this validator passes
            haltOnPass: false,

            //haltOnFail: boolean
            //     If this validator is part of a ValidatorGroup, setting
            //     to true will stop any Validators after this one
            //     from executing if this validator fails
            haltOnFail: false,

            //skipOnPass:
            //     If this validator is part of a ValidatorGroup, setting
            //     to true will skip evaluating this validator, if all previous
            //     validators have already evaluated to true
            skipOnPass: false,

            //skipOnFail:
            //     If this validator is part of a ValidatorGroup, setting
            //     to true will skip evaluating this validator, if a previous
            //     validator has already evaluated to false
            skipOnFail: false,

            useCache: true,

            _validatedValuesCache: {},

            _maxCacheSize: 100,

            isValid: function(value){

                this._valueString = value.toString();

                if (this.useCache){
                    var cacheItem = this._validatedValuesCache[this._valueString];
                    if(cacheItem){
                        this.set('messages', cacheItem.messages);
                        return cacheItem.result;
                    }
                }
                var result = this._isValid(value);

                if (this.useCache){
                    this._addToCache(this._valueString, result);
                }
                return result;
            },

            _isValid: function(value){
                // summary:
                //     Should be overridden by inheriting modules.
                //     Will check if the supplied value is valid or not.
                //     If the value is invalid, should populate the messages array.
                //
                // returns:
                //     boolean

                var messages = [];
                var result;

                if(value){
                    messages.push('valid');
                    result = true;
                } else {
                    messages.push('invalid');
                    result = false;
                }

                this.set('messages', messages);
                return result;
            },

            _addToCache: function(valueString, result){
                if (isDeferred(result)){
                    result.then(
                        lang.hitch(this, function(resultDeferred){
                            this._validatedValuesCache[valueString] = {
                                result: resultDeferred,
                                messages: this.messages
                            }
                        }),
                        function(){
                            //Do nothing if error
                        }
                    );
                } else {
                    this._validatedValueCache[valueString] = {
                        result: result,
                        messages: this.messages
                    }
                }
            }
        }
    );

    BaseValidator.isValidator = function(validator){
        //summary:
        //     Helper method to determine if a validator is an instance of BaseValidator
        //
        // returns:
        //     boolean

        if (validator.isInstanceOf && validator.isInstanceOf(BaseValidator)){
            return true;
        }
        return false;
    }

    BaseValidator.isDeferred = isDeferred;

    return BaseValidator;
});
