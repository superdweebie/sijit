define([
    'Sds/ServiceManager/Shared/GetRef!exceptionManager',
    'Sds/ConfigManager/ConfigReady!'
],
function(exceptionManagerRef){
	return function(exception){
        exceptionManagerRef.handle(exception);
    }
});


