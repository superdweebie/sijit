define([
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/DeferredList'
],
function(
    lang,
    Deferred,
    DeferredList
){
    return {

        createGroup: function(validators){

            var deferredGroup = new Deferred;
            var deferredValidators = [];

            for (var index in validators){
                deferredValidators.push(this.create(validators[index]['class'], validators[index].options));
            }

            var deferredValidatorsList = new DeferredList(deferredValidators);
            deferredValidatorsList.then(lang.hitch(this, function(result){
                var instances = [];
                var index;

                for(index in result){
                    instances.push(result[index][1]);
                }

                this.create('Sds/Common/Validator/ValidatorGroup', {validators: instances}).then(function(validatorGroup){
                    deferredGroup.resolve(validatorGroup);
                });
            }));
            return deferredGroup;
        },

        create: function(module, options){

            var validatorDeferred = new Deferred;

            require([module], function(Validator){
                var validator = new Validator;
                lang.mixin(validator, options);
                validatorDeferred.resolve(validator);
            });

            return validatorDeferred;
        }
    }
});
