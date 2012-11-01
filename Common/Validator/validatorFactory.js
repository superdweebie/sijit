define([
    'dojo/_base/lang',
    'Sds/ModuleManager/ModuleManager'
],
function(
    lang,
    ModuleManager
){
    return {

        create: function(config){

            var moduleManager = new ModuleManager;

            if (lang.isArray(config)){
                return moduleManager.get({
                    mid: 'Sds/Common/Validator/ValidatorGroup',
                    gets: {
                        validators: config
                    }
                })
            } else {
                return moduleManager.get(config);
            }
        }
    }
});
