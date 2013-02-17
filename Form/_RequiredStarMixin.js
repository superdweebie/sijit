define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    '../Validator/Required',
    '../Validator/Group'
],
function (
    declare,
    lang,
    Required,
    Group
){
    return declare(
        [],
        {

            //Adds the supplied string as an appendage to the label if validator is the same as the requiredValidatorDef
            
            //When should the star be shown? Possible values:
            //    false: never show
            //    true: always show
            //    auto: only show if a required validator is set
            requiredStar: 'auto',
            
            requiredStarTemplate: '<span class="text-warning"> *</span>',

            requiredValidatorDef: Required,

            groupValidatorDef: Group,           

            _setLabelAttr: function(value) {

                var add;
                if (this.requiredStar == 'auto'){
                    var validator = this.validator;
                    if (validator && validator.isInstanceOf){
                        if (validator.isInstanceOf(this.requiredValidatorDef)){
                            add = true;
                        } else if (validator.isInstanceOf(this.groupValidatorDef) && validator.hasInstanceOf(this.requiredValidatorDef)){
                            add = true;
                        }
                    }
                } else if (this.requiredStar){
                    add = true;
                }

                value = value.replace(this.requiredStarTemplate, '');
                if (add){
                    value = value + this.requiredStarTemplate                        
                }
                    
                this.inherited(arguments, [value]);
            },
            
            startup: function(){

                this.inherited(arguments);

                this.watch('validator', lang.hitch(this, function(prop, oldValue, newValue){
                    this.set('label', this.label);
                }));
                
                this.watch('requiredStar', lang.hitch(this, this.set('label', this.label)));
            }
        }
    );
});
