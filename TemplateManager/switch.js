define([
        'dojo/when',
        'Sds/ServiceManager/Shared/getObject!templateManager'
    ],
    function(
        when,
        templateManager
    ){
        // module:
        //		Sds/TemplateManager/switch
        //
        // An AMD plugin that will use the TemplateManager to switch templates
        // depending on the context

        return {
            load: function(id, require, callback){
                when(templateManager.load(id), function(template){
                    callback(template);
                });
            }
        };
    }
);