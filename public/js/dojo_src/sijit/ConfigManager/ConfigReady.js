define([
        'dojo/_base/Deferred',
        'sijit/ConfigManager/ConfigManager'
    ],
    function(
        Deferred,
        ConfigManager
    ){
        // module:
        //		sijit/ConfigManager/ConfigReady
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