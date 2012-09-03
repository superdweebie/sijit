define([
    'Sds/ServiceManager/Shared/GetRef!exceptionController',
    'Sds/ConfigManager/ConfigReady!'
],
function(exceptionControllerRef){
	return function(exception){
        exceptionControllerRef.handle(exception);
    }
});


