define([
    'dojo/when',
    '../ConfigManager/configManager'
],
function(
    when,
    configManager
){
    // module:
    //		Sds/ConfigManager/configReady
    //
    // An AMD plugin that will wait until merged config is created

    return {
        load: function(id, require, callback){
            when(configManager.merge(), function(){
                callback();
            });
        }
    };
});
