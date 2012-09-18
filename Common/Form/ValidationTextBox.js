define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-class',
    'Sds/Common/Validator/BaseValidator',
    'Sds/Common/Form/TextBox',
    'dojo/text!./Template/ValidationTextBox.html'
],
function (
    declare,
    lang,
    domClass,
    BaseValidator,
    TextBox,
    template
){
    return declare(
        'Sds/Common/Form/ValidationTextBox',
        [TextBox],
        {
            templateString: template,

            // required: Boolean
            //		User is required to enter data into this field.
            required: false,

            // message: String
            //		Currently error/prompt message.
            message: '',

            // state: [readonly] String
            //		Shows current state (ie, validation result) of input (""=Normal, Incomplete, or Error)
            state: '',

            _validatorSet: false,

            validator: undefined,

            _setValueAttr: function(/*anything*/ newValue){              
                // summary:
                //		Hook so set('value', ...) works.
                //this.inherited(arguments);
                var args = [newValue, true];
                args.callee = arguments.callee;
                //this.inherited([newValue, true]);
                this.inherited(args);
                this._validate();
            },

            _refreshState: function(){
                // Overrides TextBox._refreshState()
                if(this._created){
                    this.set('value');
                }
                this.inherited(arguments);
            },

            _setValidatorAttr: function(value){
                if ( ! (value.isInstanceOf && value.isInstanceOf(BaseValidator))){
                    require([value['class']], lang.hitch(this, function(Validator){
                        var validator = new Validator();
                        lang.mixin(validator, value.options);
                        this.validator = validator;
                        this._validatorSet = true;
                        this._validate();
                    }));
                } else {
                    this.validator = value;
                    this._validatorSet = true;
                    this._validate();
                }
            },

            _validate: function(){

                if (! this._validatorSet){
                    return;
                }

                if (this.validator.isValid(this.get('value'))){
                    domClass.remove(this.domNode, 'error');
                    this.inlineMessage.innerHTML = '';
                    this.blockMessage.innerHTML = '';
                    this.set('state', '');
                } else {
                    domClass.add(this.domNode, 'error');
                    var messages = this.validator.get('messages');
                    if (messages.length > 1){
                        this.inlineMessage.innerHTML = '';
                       this.blockMessage.innerHTML = messages.join('<br />');
                    } else {
                        this.blockMessage.innerHTML = '';
                        this.inlineMessage.innerHTML = messages[0];
                    }
                    this.set('state', 'Error');
                }
            }
        }
    );
});
