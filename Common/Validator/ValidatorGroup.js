define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'Sds/Common/Validator/BaseValidator',
    'Sds/Common/utils'
],
function(
    declare,
    lang,
    Deferred,
    BaseValidator,
    utils
){
    return declare(
        'Sds/Common/Validator/ValidatorGroup',
        [BaseValidator],
        {
            validators: [],

            constructor: function(validators){
                if (validators){
                    this.validators = validators;
                }
            },

            isValid: function(value){
                var result = this._loop(value, 0, true, [], []);
                return result;
            },

            _loop: function(value, index, currentResult, messages, preResolveMessages){
                //Summary:
                //    loops over all the validators in turn.
                //    This code is slightly insane, but it works.
                //    Most of the instanity comes from handling the possibility
                //    that a validator may return a Deferred. If a Deferred is
                //    returned from one or more validators, then a Deferred will
                //    be returned from the ValidatorGroup
                //

                if (this.validators.length <= index){
                    this.set('messages', messages);
                    return currentResult;
                }

                var validator = this.validators[index];

                if ( !(validator.skipOnPass && currentResult) && !(validator.skipOnFail && ! currentResult)){

                    var validatorReturn = validator.isValid(value);
                    if (BaseValidator.isDeferred(validatorReturn)){
                        var resultDeferred = new Deferred;
                        currentResult = resultDeferred;

                        preResolveMessages = preResolveMessages.concat(validator.get('messages'));
                        messages = messages.concat(validator.get('messages'));

                        validatorReturn.then(lang.hitch(this, function(newResult){
                            if (newResult){
                                if (validator.haltOnPass){halt = true}
                            } else {
                                currentResult = false;
                                messages = messages.concat(validator.get('messages'));
                                messages = utils.arraySubtract(messages, preResolveMessages);
                                if (validator.haltOnFail){halt = true}
                            }
                            if (halt){
                                resultDeferred.resolve(currentResult);
                            } else {
                                resultDeferred.resolve(this._loop(value, index + 1, currentResult, messages, preResolveMessages));
                            }
                        }));

                        this.set('messages', messages);
                        return currentResult;
                    } else {
                        var halt = false;
                        if (validatorReturn){
                            if (validator.haltOnPass){halt = true}
                        } else {
                            currentResult = false;
                            messages = messages.concat(validator.get('messages'));
                            if (validator.haltOnFail){halt = true}
                        }
                        if (halt){
                            this.set('messages', messages);
                            return currentResult;
                        } else {
                            return this._loop(value, index + 1, currentResult, messages, preResolveMessages);
                        }
                    }
                }

                this.set('messages', messages);
                return currentResult;
            }
        }
    );
});
