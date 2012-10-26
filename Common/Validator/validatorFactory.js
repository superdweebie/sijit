define([
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/DeferredList',
    'Sds/Common/Validator/BaseValidator'
],
function(
    lang,
    Deferred,
    DeferredList,
    BaseValidator
){
    return {

        createGroup: function(validators){
            //summary:
            //    Creates an instance of a ValidatorGroup
            //
            //description:
            //    The `validators` argument must be an array.
            //    Each element of the array may be either a validator, or an
            //    object holding arguments that may be passed to `validatorFactory.create`
            //    to get the validator. eg:
            //
            //    createGroup([
            //        'Sds/Common/Validator/AlphaValidator',
            //        {
            //            'class': 'Sds/Common/Validator/LengthValidator',
            //            options: {min: 10, max: 120}
            //        }
            //    ])
            //
            //    CreateGroup will return a promise, which will resolve to the ValidatorGroup
            //    instance.

            var deferredGroup = new Deferred;
            var deferredValidators = [];

            for (var index in validators){
                if (BaseValidator.isValidator(validators[index])){
                    var deferredValidator = new Deferred;
                    deferredValidator.resolve(validators[index]);
                    deferredValidators.push(deferredValidator);
                } else {
                    deferredValidators.push(this.create(validators[index]));
                }
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

        create: function(){
            //summary:
            //    Creates an instance of a validator
            //
            //description:
            //    create may be called in several different ways.
            //
            //    Create may be called with a string giving the moduleName, and
            //    an options object which will be mixed into the validator instance:
            //
            // |  create(moduleName, optionsObject)
            //
            //    Alternately, create may be called with a single object with both
            //    `class` and `options` keys:
            //
            // |  create({'class': moduleName, options: optionsObject})
            //
            //    Finally, create may be called with an array. If so, this array will
            //    be passed to createGroup to create a ValidatorGroup:
            //
            //    create([validator1, validator2])
            //
            //    Create will return a promise, which will resolve to the validator
            //    instance.

            var module;
            var options;

            if (lang.isArray(arguments[0])){
                return this.createGroup(arguments[0]);
            }

            var validatorDeferred = new Deferred;

            if (BaseValidator.isValidator(arguments[0])){
                //It's already a validator, just pass it back!
                validatorDeferred.resolve(arguments[0]);
            }

            if (typeof arguments[0] === 'string'){
                module = arguments[0];
                options = arguments[1];
            } else {
                module = arguments[0]['class'];
                options = arguments[0].options;
            }

            require([module], function(Validator){
                var validator = new Validator;
                lang.mixin(validator, options);
                validatorDeferred.resolve(validator);
            });

            return validatorDeferred;
        }
    }
});
