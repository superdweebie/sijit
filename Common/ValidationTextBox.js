define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/dom-class',
    'Sds/Common/Validator/BaseValidator',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'dijit/Form/_FormValueMixin',
    'dojo/text!./Template/ValidationTextBox.html'
],
function (
    declare,
    lang,
    Deferred,
    domClass,
    BaseValidator,
    Widget,
    TemplatedMixin,
    FormValueMixin,
    template
){
    return declare(
        'Sds/Common/ValidationTextBox',
        [Widget, TemplatedMixin, FormValueMixin],
        {
            templateString: template,

            // required: Boolean
            //		User is required to enter data into this field.
            required: false,

            // message: String
            //		Currently error/prompt message.
            //		When using the default tooltip implementation, this will only be
            //		displayed when the field is focused.
            message: '',

            // state: [readonly] String
            //		Shows current state (ie, validation result) of input (""=Normal, Incomplete, or Error)
            state: '',

            _validatorSet: false,

            validator: undefined,

            _setValueAttr: function(){
                // summary:
                //		Hook so set('value', ...) works.
                this.inherited(arguments);
                this._validate();
            },

            _setValidatorAttr: function(value){
                if ( ! value instanceof BaseValidator){
                    require([value['class']], lang.hitch(this, function(Validator){
                        var validator = new Validator();
                        lang.mixin(validator, value.options);
                        this.validator = validator;
                        this._validatorSet = true;
                        this._validate();
                    }));
                }
                this.validator = value;
                this._validatorSet = true;
                this._validate();
            },

            _validate: function(){

                if (! this.validatorSet){
                    return;
                }

                if (this.validator.isValid(this.get('value'))){
                    domClass.remove(this.domNode, 'error');
                    this.set('state', '');
                } else {
                    domClass.add(this.domNode, 'error');
                    this.set('state', 'Error');
                }
            }
        }
    );
});
