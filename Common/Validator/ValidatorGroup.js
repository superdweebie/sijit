define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'Sds/Common/utils',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    lang,
    Deferred,
    utils,
    BaseValidator
){
    return declare(
        'Sds/Common/Validator/ValidatorGroup',
        [BaseValidator],
        {
            validators: [],

            _isValid: function(value){
                return this._concatMessages(this._loop(value, 0, {result: true, messagesLists: []}));
            },

            _loop: function(value, index, currentResultObject){
                //Summary:
                //    loops over all the validators in turn.
                //    This code is slightly insane, but it works.
                //    Most of the instanity comes from handling the possibility
                //    that a validator may return a Deferred. If a Deferred is
                //    returned from one or more validators, then a Deferred will
                //    be returned from the ValidatorGroup
                //

                if (this.validators.length <= index){
                    return currentResultObject;
                }

                var validator = this.validators[index];

                if ( !(validator.skipOnPass && currentResultObject.result) && !(validator.skipOnFail && ! currentResultObject.result)){

                    var validatorReturn = validator.isValid(value);
                    if (utils.isDeferred(validatorReturn.result)){

                        var resultDeferred = new Deferred;
                        currentResultObject.result = resultDeferred;
                        currentResultObject.messagesLists[index] = validatorReturn.messages;

                        validatorReturn.result.then(lang.hitch(this, function(newResultObject){
                            if (newResultObject.result){
                                if (validator.haltOnPass){halt = true}
                            } else {
                                currentResultObject.result = false;
                                currentResultObject.messagesLists[index] = newResultObject.messages;
                                if (validator.haltOnFail){halt = true}
                            }
                            if (halt){
                                resultDeferred.resolve(this._concatMessages(currentResultObject));
                            } else {
                                resultDeferred.resolve(this._concatMessages(this._loop(value, index + 1, currentResultObject)));
                            }
                        }));

                        return currentResultObject;
                    } else {
                        var halt = false;
                        if (validatorReturn.result){
                            if (validator.haltOnPass){halt = true}
                        } else {
                            currentResultObject.result = false;
                            if (validator.haltOnFail){halt = true}
                        }
                        currentResultObject.messagesLists[index] = validatorReturn.messages;

                        if (halt){
                            return currentResultObject;
                        } else {
                            return this._loop(value, index + 1, currentResultObject);
                        }
                    }
                }

                return currentResultObject;
            },

            _concatMessages: function(resultObject){
                var returnResultObject = {result: resultObject.result, messages: []};
                for (var index in resultObject.messagesLists){
                    returnResultObject.messages = returnResultObject.messages.concat(resultObject.messagesLists[index]);
                }
                return returnResultObject;
            }
        }
    );
});
