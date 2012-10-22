define([
    'dojo/Deferred',
    'Sds/ServiceManager/Shared/getProxy!Sds/ExceptionModule/ExceptionController',
    'Sds/ConfigManager/configReady!'
],
function(Deferred, exceptionControllerProxy){
	return function(exception){
        var resultDeferred = new Deferred;
        exceptionControllerProxy.standardize(exception).then(function(standardizedException){
            resultDeferred.resolve(standardizedException);
            exceptionControllerProxy.handle(standardizedException);
        })
        
        return resultDeferred;
    }
});


