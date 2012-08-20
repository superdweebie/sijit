define([
        'dojo/_base/Deferred',
        'Sds/ConfigManager/ConfigManager'
    ],
    function(
        Deferred,
        ConfigManager
    ){
        // module:
        //		Sds/ConfigManager/ConfigReady
        //
        // An AMD plugin that will wait until merged config is created

        return {
            load: function(id, require, callback){
                var configManager = new ConfigManager();
                Deferred.when(configManager.merge(), function(){
                    callback();
                });
            }
        };
    }
);