define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/json',
    '../utils',
    'dojo/Stateful'
],
function(
    declare,
    lang,
    json,
    utils,
    Stateful
){
    // module:
    //		Sds/Validator/Base

    var Base = declare(
        [Stateful],
        {
            // summary:
            //		The base Validator module that all other Validator modules
            //		should inherit from.

            //haltOnPass: boolean
            //     If this validator is part of a ValidatorGroup, setting
            //     to true will stop any Validators after this one
            //     from executing if this validator passes
            //haltOnPass: false,

            //haltOnFail: boolean
            //     If this validator is part of a ValidatorGroup, setting
            //     to true will stop any Validators after this one
            //     from executing if this validator fails
            //haltOnFail: false,

            //skipOnPass:
            //     If this validator is part of a ValidatorGroup, setting
            //     to true will skip evaluating this validator, if all previous
            //     validators have already evaluated to true
            //skipOnPass: false,

            //skipOnFail:
            //     If this validator is part of a ValidatorGroup, setting
            //     to true will skip evaluating this validator, if a previous
            //     validator has already evaluated to false
            //skipOnFail: false,

            useCache: true,

            //_validatedValuesCache: undefined,

            maxCacheSize: 50,

            constructor: function(){
                this._validatedValuesCache = {};
            },

            isValid: function(value){

                var valueString = json.stringify(value);

                if (this.useCache){
                    var cacheItem = this._validatedValuesCache[valueString];
                    if(cacheItem){
                        return cacheItem;
                    }
                }

                var resultObject = this._isValid(value);

                if (this.useCache){
                    this._addToCache(valueString, resultObject);
                }

                return resultObject;
            },

            _isValid: function(value){
                // summary:
                //     Should be overridden by inheriting modules.
                //     Will check if the supplied value is valid or not.
                //     If the value is invalid, should populate the messages array.
                //
                // returns:
                //     {result: result, messages: messages}
            },

            _addToCache: function(valueString, resultObject){

                var cacheResult = lang.hitch(this, function(resultObject){
                    if (utils.isDeferred(resultObject.result)){
                        resultObject.result.then(function(resultObject){
                            cacheResult(resultObject);
                        });
                    } else {
                        if (this._validatedValuesCache.length > this.maxCacheSize){
                            this._validatedValuesCache.shift();
                        }
                        this._validatedValuesCache[valueString] = resultObject;
                    }
                });

                cacheResult(resultObject);
            }
        }
    );

    Base.isValidator = function(validator){
        //summary:
        //     Helper method to determine if a validator is an instance of Base validator
        //
        // returns:
        //     boolean

        if (validator && validator.isInstanceOf && validator.isInstanceOf(Base)){
            return true;
        }
        return false;
    }

    return Base;
});
