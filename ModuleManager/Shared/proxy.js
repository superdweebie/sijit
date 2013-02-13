define([
        'dojo/when',
        './getModuleManager!'
    ],
    function(
        when,
        sharedModuleManager
    ){
        // module:
        //		Sds/ModuleManager/Shared/proxy
        //
        // An AMD plugin that return a Proxy to the requested object from the
        // shared ModuleManager

        return {
            load: function(id, require, callback){
                when(sharedModuleManager.proxy(id), function(object){
                    callback(object);
                });
            }
        };
    }
);


