define([
    'dojo/_base/lang',
    'Sds/ModuleManager/Shared/getModuleManager!'
],
function(
    lang,
    moduleManager
){
    return {

        create: function(config){

            if (lang.isArray(config)){
                return moduleManager.get({
                    base: 'Sds/Common/Validator/ValidatorGroup',
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
