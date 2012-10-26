define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojox/timing',
    'Sds/Common/Validator/BaseValidator',
],
function(
    declare,
    lang,
    Deferred,
    timing,
    BaseValidator
){
    // module:
    //		Sds/Test/Common/Validator/DeferredValidator

    return declare(
        'Sds/Test/Common/Validator/DeferredValidator',
        [BaseValidator],
        {

            _isValid: function(value){

                var resultDeferred = new Deferred;
                this.set('messages', ['validating...']);

                // Delay the validation result for two seconds to simulate server response time
                var timer = new timing.Timer(2000);
                timer.onTick = lang.hitch(this, function(){
                    timer.stop();
                    if (this._valueString != value.toString()){
                        resultDeferred.reject('Deferred validator returning for old value');
                    } else {
                        if (value == 'awesome'){
                            this.set('messages', []);
                            resultDeferred.resolve(true);
                        } else {
                            this.set('messages', ['value must be "awesome"']);
                            resultDeferred.resolve(false);
                        }
                    }
                });
                timer.start();

                return resultDeferred;
            }
        }
    );
});
