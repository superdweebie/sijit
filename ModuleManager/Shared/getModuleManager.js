define([
        'Sds/ModuleManager/ModuleManager',
        'Sds/ConfigManager/configReady!'
    ],
    function(
        ModuleManager
    ){
        // module:
        //		Sds/ModuleManager/Shared/getModuleManager
        //
        // An AMD plugin that returns an instance of the ModuleManager configured
        // by dojo config

        var sharedModuleManager = undefined;
        return {
            load: function(id, require, callback){
                if ( ! sharedModuleManager){
                    sharedModuleManager = new ModuleManager();
                }
                callback(sharedModuleManager);
            }
        };
    }
);
