define([
        'dojo/when',
        'Sds/ServiceManager/Shared/GetServiceManager!'
    ],
    function(
        when,
        sharedServiceManager
    ){
        // module:
        //		Sds/ServiceManager/Shared/GetRef
        //
        // An AMD plugin that return an reference to the requested object from the
        // shared ServiceManager

        return {
            load: function(id, require, callback){
                when(sharedServiceManager.getRef(id), function(object){
                    callback(object);
                });
            }
        };
    }
);


