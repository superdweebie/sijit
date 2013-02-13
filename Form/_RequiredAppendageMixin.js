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
            requiredAppendage: '<span class="text-warning"> *</span>',

            requiredValidatorDef: Required,

            groupValidatorDef: Group,

            //requiredAppendageNode: undefined,

            startup: function(){

                this.inherited(arguments);

                var applyAppendage = lang.hitch(this, function(validator){
                    var add;
                    if (validator && validator.isInstanceOf){
                        if (validator.isInstanceOf(this.requiredValidatorDef)){
                            add = true;
                        } else if (validator.isInstanceOf(this.groupValidatorDef)){
                            array.forEach(validator.validators, lang.hitch(this, function(item){
                                if (item.isInstanceOf(Required)){
                                    add = true;
                                }
                            }));
                        }
                    }
                    if (add){
                        if ( ! this.requiredAppendageNode){
                            this.requiredAppendageNode = domConstruct.create(
                                'span',
                                {},
                                this.focusNode ? this.focusNode : this.domNode,
                                this.focusNode ? 'after' : 'last'
                            )
                        }
                        this.requiredAppendageNode.innerHTML = this.requiredAppendage;
                        domClass.remove(this.requiredAppendageNode, 'hide');
                    } else if (this.requiredAppendageNode){
                        domClass.add(this.requiredAppendageNode, 'hide');
                    }
                });

                this.watch('validator', lang.hitch(this, function(prop, oldValue, newValue){
                    applyAppendage(newValue)
                }));
                applyAppendage(this.validator);
            }
        }
    );
});
