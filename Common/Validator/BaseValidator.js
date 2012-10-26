define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/Deferred',
    'dojo/Stateful'
],
function(
    declare,
    lang,
    when,
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

            _validatedValuesCache: undefined,

            maxCacheSize: 50,

            constructor: function(){
                this._validatedValuesCache = {};
            },

            isValid: function(value){

                var valueString = value.toString();
                this._valueString = valueString;

                if (this.useCache){
                    var cacheItem = this._validatedValuesCache[this._valueString];
                    if(cacheItem){
                        this.set('messages', cacheItem.messages);
                        return cacheItem.result;
                    }
                }
                var resultObject = this._isValid(value);
                var result = resultObject.result;
                var messages = resultObject.messages;

                if (this.useCache){
                    this._addToCache(valueString, result, messages);
                }

                this.set('messages', messages);
                if (isDeferred(result)){
                    var resultDeferred = new Deferred;
                    this._handleDeferredResult(valueString, result, resultDeferred);
                    return resultDeferred;
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

                return {result: result, messages: messages};
            },

            _handleDeferredResult: function(valueString, resultObjectDeferred, resultDeferred){
                resultObjectDeferred.then(lang.hitch(this, function(resultObject){
                    if (this._valueString == valueString){
                        this.set('messages', resultObject.messages);
                        if (isDeferred(resultObject.result)){ //handle nested Deferreds
                            this._handleDeferredResult(valueString, resultObject.result, resultDeferred);
                        } else {
                            resultDeferred.resolve(resultObject.result);
                        }
                    } else {
                        resultDeferred.cancel('Deferred validation late');
                    }
                }));
            },

            _addToCache: function(valueString, result, messages){

                when(result, lang.hitch(this, function(resultObject){
                    if (isDeferred(result)){
                        result = resultObject.result;
                        messages = resultObject.messages;
                    }
                    if (this._validatedValuesCache.length > this.maxCacheSize){
                        this._validatedValuesCache.shift();
                    }
                    this._validatedValuesCache[valueString] = {
                        result: result,
                        messages: messages
                    }
                }));
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
