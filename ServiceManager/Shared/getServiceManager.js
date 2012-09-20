define([
        'Sds/ServiceManager/ServiceManager',
        'Sds/ConfigManager/configReady!'
    ],
    function(
        ServiceManager
    ){
        // module:
        //		Sds/ServiceManager/Shared/getServiceManager
        //
        // An AMD plugin that returns an instance of the ServiceManager configured
        // by dojo config

        var sharedServiceManager = undefined;
        return {
            load: function(id, require, callback){
                if ( ! sharedServiceManager){
console.debug('create shared');
                    sharedServiceManager = new ServiceManager();
                }
                callback(sharedServiceManager);
            }
        };
    }
);
