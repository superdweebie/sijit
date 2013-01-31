define([
    'dojo/_base/lang'
],
function(
    lang
){
    return {

        manager: undefined,

        create: function(config){

            if (lang.isArray(config)){
                return this.manager.get({
                    base: 'Sds/Validator/Group',
                    gets: {
                        validators: config
                    }
                })
            } else {
                return this.manager.get(config);
            }
        }
    }
});
