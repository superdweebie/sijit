define([
        'dojo/when',
        'Sds/ServiceManager/Shared/getServiceManager!'
    ],
    function(
        when,
        sharedServiceManager
    ){
        // module:
        //		Sds/ServiceManager/Shared/getProxy
        //
        // An AMD plugin that return a Proxy to the requested object from the
        // shared ServiceManager

        return {
            load: function(id, require, callback){
                when(sharedServiceManager.getProxy(id), function(object){
                    callback(object);
                });
            }
        };
    }
);


