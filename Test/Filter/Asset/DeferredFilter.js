define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'Sds/Filter/Base',
],
function(
    declare,
    lang,
    Deferred,
    Base
){
    // module:
    //		Sds/Test/Filter/Asset/DeferredFilter

    return declare(
        'Sds/Test/Validator/Asset/DeferredFilter',
        [Base],
        {

            filter: function(value){

                var resultDeferred = new Deferred;

                // Delay the filter result to simulate server response time
                setTimeout(lang.hitch(this, function(){
                    resultDeferred.resolve('processed' + value);
                }), this.timeout);

                return resultDeferred;
            }
        }
    );
});
