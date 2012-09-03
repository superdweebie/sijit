define([
        'dojo/when',
        'Sds/ServiceManager/Shared/GetServiceManager!'
    ],
    function(
        when,
        sharedServiceManager
    ){
        // module:
        //		Sds/ServiceManager/Shared/CreateObject
        //
        // An AMD plugin that will create and return an instance of the requested object from the
        // shared ServiceManager

        return {
            load: function(id, require, callback){
                when(sharedServiceManager.createObject(id), function(object){
                    callback(object);
                });
            }
        };
    }
);


