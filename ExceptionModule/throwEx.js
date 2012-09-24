define([
    'Sds/ServiceManager/Shared/getProxy!exceptionController',
    'Sds/ConfigManager/configReady!'
],
function(exceptionControllerProxy){
	return function(exception){
        exceptionControllerProxy.handle(exception);
    }
});


