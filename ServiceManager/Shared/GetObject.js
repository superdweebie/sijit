define([
        'dojo/when',
        'Sds/ServiceManager/Shared/GetServiceManager!'
    ],
    function(
        when,
        sharedServiceManager
    ){
        // module:
        //		Sds/ServiceManager/Shared/GetObject
        //
        // An AMD plugin that return an instance of the requested object from the
        // shared ServiceManager

        return {
            load: function(id, require, callback){
                when(sharedServiceManager.getObject(id), function(object){
                    callback(object);
                });
            }
        };
    }
);


