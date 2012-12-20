define([
    'dojo/_base/lang'
],
function(
    lang
){
    return {

        validatorManager: undefined,

        create: function(config){

            if (lang.isArray(config)){
                return this.validatorManager.get({
                    base: 'Sds/Validator/ValidatorGroup',
                    gets: {
                        validators: config
                    }
                })
            } else {
                return this.validatorManager.get(config);
            }
        }
    }
});
