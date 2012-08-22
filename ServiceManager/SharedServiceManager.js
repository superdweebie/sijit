define([
        'Sds/ServiceManager/ServiceManager',
        'Sds/ConfigManager/ConfigReady!'
    ],
    function(
        ServiceManager
    ){
        // module:
        //		Sds/ServiceManager/SharedServiceManager
        //
        // An AMD plugin that returns an instance of the ServiceManager configured
        // by dojo config

        return {
            load: function(id, require, callback){
                callback(new ServiceManager());
            }
        };
    }
);
