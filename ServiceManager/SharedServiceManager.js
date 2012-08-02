define([
        'sijit/ServiceManager/ServiceManager',
        'sijit/ConfigManager/ConfigReady!'
    ],
    function(
        ServiceManager
    ){
        // module:
        //		sijit/ServiceManager/SharedServiceManager
        //
        // An AMD plugin that return an instance of the ServiceManager configured
        // by dojo config

        return {
            load: function(id, require, callback){
                callback(new ServiceManager());
            }
        };
    }
);
