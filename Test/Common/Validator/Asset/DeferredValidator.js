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

            timeout: 1000,

            _isValid: function(value){

                var resultDeferred = new Deferred;

                // Delay the validation result for two seconds to simulate server response time
                var timer = new timing.Timer(this.timeout);
                timer.onTick = lang.hitch(this, function(){
                    timer.stop();
                    if (value == 'awesome'){
                        resultDeferred.resolve({result: true, messages: []});
                    } else {
                        resultDeferred.resolve({result: false, messages: ['value must be awesome']});
                    }
                });
                timer.start();

                return {result: resultDeferred, messages: ['...is validating']};
            }
        }
    );
});
