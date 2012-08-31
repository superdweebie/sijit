define([
        'dojo/_base/Deferred',
        'Sds/ServiceManager/Shared/GetServiceManager!'
    ],
    function(
        Deferred,
        sharedServiceManager
    ){
        // module:
        //		Sds/ServiceManager/Shared/GetRef
        //
        // An AMD plugin that return an reference to the requested object from the
        // shared ServiceManager

        return {
            load: function(id, require, callback){
                Deferred.when(sharedServiceManager.getRef(id), function(object){
                    callback(object);
                });
            }
        };
    }
);


