define([
    'dojo/Deferred',
    'dojo/when',
    'proxy!Sds/ExceptionModule/ExceptionController',
    'Sds/ConfigManager/configReady!'
],
function(Deferred, when, exceptionControllerProxy){
	return function(exception){
        var resultDeferred = new Deferred;
        when(exceptionControllerProxy.standardize(exception), function(standardizedException){
            resultDeferred.resolve(standardizedException);
            exceptionControllerProxy.handle(standardizedException);
        })

        return resultDeferred;
    }
});


