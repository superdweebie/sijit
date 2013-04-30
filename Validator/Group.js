define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    '../utils',
    './Base'
],
function(
    declare,
    lang,
    Deferred,
    utils,
    Base
){
    return declare(
        [Base],
        {
            //validators: [],

            constructor: function(){
                this.validators = [];
            },
            
            hasInstanceOf: function(Constructor){
                for (var item in this.validators){
                    if (this.validators[item].isInstanceOf(Constructor)){
                        return true;
                    }
                }
            },
            
            _isValid: function(value){
                return this._concatResultObjectList(this._loop(value, 0, []));
            },

            _loop: function(value, index, resultObjectList){
                //Summary:
                //    loops over all the validators in turn.
                //    This code is slightly insane, but it works.
                //    Most of the instanity comes from handling the possibility
                //    that a validator may return a Deferred. If a Deferred is
                //    returned from one or more validators, then a Deferred will
                //    be returned from the Group
                //

                if (this.validators.length <= index){
                    return resultObjectList;
                }

                var validator = this.validators[index],
                    currentResult = this._currentResult(resultObjectList);

                if ( !(validator.skipOnPass && currentResult) && !(validator.skipOnFail && ! currentResult)){

                    var resultObject = this._getResultObject(validator, value);

                    if (utils.isDeferred(resultObject.result)){

                        var resultDeferred = new Deferred;
                        resultObjectList[index] = {result: resultDeferred, messages: resultObject.messages};

                        resultObject.result.then(lang.hitch(this, function(resultObject){
                            resultObjectList[index] = resultObject;
                            if (resultObject.result === true){
                                if (validator.haltOnPass){halt = true}
                            } else {
                                if (validator.haltOnFail){halt = true}
                            }

                            if (halt){
                                resultDeferred.resolve(this._concatResultObjectList(resultObjectList));
                            } else {
                                resultDeferred.resolve(this._concatResultObjectList(this._loop(value, index + 1, resultObjectList)));
                            }
                        }));

                        return resultObjectList;
                    } else {
                        resultObjectList[index] = resultObject;

                        var halt = false;
                        if (resultObject.result === true){
                            if (validator.haltOnPass){halt = true}
                        } else {
                            if (validator.haltOnFail){halt = true}
                        }

                        if (halt){
                            return resultObjectList;
                        } else {
                            return this._loop(value, index + 1, resultObjectList);
                        }
                    }
                }

                return resultObjectList;
            },

            _getResultObject: function(validator, value){
                return validator.isValid(value);
            },

            _concatResultObjectList: function(resultObjectList){
                var resultObject = {result: this._currentResult(resultObjectList), messages: []};
                for (var index in resultObjectList){
                    resultObject.messages = resultObject.messages.concat(resultObjectList[index].messages);
                }
                return resultObject;
            },

            _currentResult: function(resultObjectList){
                var result = true;
                for (var index in resultObjectList){
                    switch (true){
                        case resultObjectList[index].result == false:
                            result = false;
                            break;
                        case utils.isDeferred(resultObjectList[index].result):
                            result = resultObjectList[index].result;
                            return result;
                    }
                }
                return result;
            }
        }
    );
});
