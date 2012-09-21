define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'Sds/Common/Validator/BaseValidator'
],
function(
    declare,
    lang,
    Deferred,
    BaseValidator
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
                this.messages = [];
                return this.loop(value, 0, true);
            },

            loop: function(value, index, currentResult){
                //Summary:
                //    loops over all the validators in turn.
                //    This code is slightly insane, but it works.
                //    Most of the instanity comes from handling the possibility
                //    that a validator may return a Deferred. If a Deferred is
                //    returned from one or more validators, then a Deferred will
                //    be returned from the ValidatorGroup
                //

                if (this.validators.length <= index){
                    return currentResult;
                }

                var validator = this.validators[index];

                if ( !(validator.skipOnPass && currentResult) && !(validator.skipOnFail && ! currentResult)){

                    var validatorReturn = validator.isValid(value);
                    if (this.isDeferred(validatorReturn)){
                        var resultReturn = new Deferred;
                        validatorReturn.then(lang.hitch(this, function(newResult){
                            if (newResult){
                                if (validator.haltOnPass){halt = true}
                            } else {
                                currentResult = false;
                                this.messages = this.messages.concat(validator.get('messages'));
                                if (validator.haltOnFail){halt = true}
                            }
                            if (halt){
                                resultReturn.resolve(currentResult);
                            } else {
                                resultReturn.resolve(this.loop(value, index + 1, currentResult));
                            }
                        }));
                        return resultReturn;
                    } else {
                        var halt = false;
                        if (validatorReturn){
                            if (validator.haltOnPass){halt = true}
                        } else {
                            currentResult = false;
                            this.messages = this.messages.concat(validator.get('messages'));
                            if (validator.haltOnFail){halt = true}
                        }
                        if (halt){
                            return currentResult;
                        } else {
                            return this.loop(value, index + 1, currentResult);
                        }
                    }
                }

                return currentResult;
            },

            isDeferred: function(object){
                if (object instanceof Deferred){
                    return true;
                }
                return false;
            }
        }
    );
});
