define([
        'dojo/when',
        './getModuleManager!'
    ],
    function(
        when,
        sharedModuleManager
    ){
        // module:
        //		Sds/ModuleManager/Shared/get
        //
        // An AMD plugin that returns an instance of the requested object from the
        // shared ModuleManager

        return {
            load: function(id, require, callback){
                when(sharedModuleManager.get(id), function(object){
                    callback(object);
                });
            }
        };
    }
);


