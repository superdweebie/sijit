define([
        'dojo/_base/Deferred',
        'sijit/ServiceManager/SharedServiceManager!'
    ],
    function(
        Deferred,
        sharedServiceManager
    ){
        // module:
        //		sijit/ServiceManager/Shared/GetObject
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


