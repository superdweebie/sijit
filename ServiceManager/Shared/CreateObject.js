define([
        'dojo/_base/Deferred',
        'sijit/ServiceManager/SharedServiceManager!'
    ],
    function(
        Deferred,
        sharedServiceManager
    ){
        // module:
        //		sijit/ServiceManager/Shared/CreateObject
        //
        // An AMD plugin that will create and return an instance of the requested object from the
        // shared ServiceManager

        return {
            load: function(id, require, callback){
                Deferred.when(sharedServiceManager.createObject(id), function(object){
                    callback(object);
                });
            }
        };
    }
);


