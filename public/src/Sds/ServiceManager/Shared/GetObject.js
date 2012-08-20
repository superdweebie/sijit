define([
        'dojo/_base/Deferred',
        'Sds/ServiceManager/SharedServiceManager!'
    ],
    function(
        Deferred,
        sharedServiceManager
    ){
        // module:
        //		Sds/ServiceManager/Shared/GetObject
        //
        // An AMD plugin that return an instance of the requested object from the
        // shared ServiceManager

        return {
            load: function(id, require, callback){
                Deferred.when(sharedServiceManager.getObject(id), function(object){
                    callback(object);
                });
            }
        };
    }
);


