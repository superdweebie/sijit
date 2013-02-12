define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'Sds/Validator/Base',
],
function(
    declare,
    lang,
    Deferred,
    Base
){
    // module:
    //		Sds/Test/Validator/Asset/DeferredValidator

    return declare(
        'Sds/Test/Validator/Asset/DeferredValidator',
        [Base],
        {

            timeout: 1000,

            _isValid: function(value){

                var resultDeferred = new Deferred;

                // Delay the validation result to simulate server response time
                setTimeout(lang.hitch(this, function(){
                    if (value == 'awesome'){
                        resultDeferred.resolve({result: true, messages: []});
                    } else {
                        resultDeferred.resolve({result: false, messages: ['value must be awesome']});
                    }
                }), this.timeout);

                return {result: resultDeferred, messages: ['...is validating']};
            }
        }
    );
});
