define([
        'dojo/Deferred',
        'dojo/when',
        'Sds/ConfigManager/ConfigManager'
    ],
    function(
        Deferred,
        when,
        ConfigManager
    ){
        // module:
        //		Sds/ConfigManager/ConfigReady
        //
        // An AMD plugin that will wait until merged config is created

        return {
            load: function(id, require, callback){
                var configManager = new ConfigManager();
                when(configManager.merge(), function(){
                    callback();
                });
            }
        };
    }
);