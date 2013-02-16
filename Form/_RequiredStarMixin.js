define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dojo/dom-construct',
    '../Validator/Required',
    '../Validator/Group'
],
function (
    declare,
    array,
    lang,
    domClass,
    domConstruct,
    Required,
    Group
){
    return declare(
        [],
        {

            //Adds the supplied string as an appendage if validator is the same as the requiredValidatorDef
            //requiredStar: false,
            
            requiredStarTemplate: '<span class="text-warning"> *</span>',

            requiredValidatorDef: Required,

            groupValidatorDef: Group,

            //requiredStarNode: undefined,

            startup: function(){

                this.inherited(arguments);

                var applyStar = lang.hitch(this, function(validator){
                    var add = this.requiredStar;
                    if (validator && validator.isInstanceOf){
                        if (validator.isInstanceOf(this.requiredValidatorDef)){
                            add = true;
                        } else if (validator.isInstanceOf(this.groupValidatorDef) && validator.hasInstanceOf(this.requiredValidatorDef)){
                            add = true;
                        }
                    }
                    if (add){
                        if ( ! this.requiredStarNode){
                            this.requiredStarNode = domConstruct.create(
                                'span',
                                {},
                                this.focusNode ? this.focusNode : this.domNode,
                                this.focusNode ? 'after' : 'last'
                            )
                        }
                        this.requiredStarNode.innerHTML = this.requiredStarTemplate;
                        domClass.remove(this.requiredStarNode, 'hide');
                    } else if (this.requiredStarNode){
                        domClass.add(this.requiredStarNode, 'hide');
                    }
                    this.requiredStar = add;
                });

                this.watch('validator', lang.hitch(this, function(prop, oldValue, newValue){
                    applyStar(newValue)
                }));
                
                this.watch('requiredStar', lang.hitch(this, applyStar()));
                
                applyStar(this.validator);
            }
        }
    );
});
