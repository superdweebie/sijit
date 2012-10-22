define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-class',
    'Sds/Common/Validator/BaseValidator',
    'Sds/Common/Validator/validatorFactory'
],
function (
    declare,
    lang,
    domClass,
    BaseValidator,
    validatorFactory
){
    return declare(
        'Sds/Common/Form/_ValidationMixin',
        null,
        {
            // message: String
            //		Currently error/prompt message.
            message: '',

            // state: [readonly] String
            //		Shows current state (ie, validation result) of input (""=Normal, Incomplete, or Error)
            state: '',

            _validatorSet: false,

            // validator: an instance of Sds/Common/Validator/BaseValidator.
            validator: undefined,

            _messageStyleNode: undefined,

            startup: function(){
                this.inherited(arguments);
                this._validate();
            },

            _setValueAttr: function(){
                // summary:
                //		Hook so set('value', ...) works.
                this.inherited(arguments);
                this._validate();
            },

            _setValidatorAttr: function(value){
                // summary:
                //     Will set the validator. The value parameter may be one of three
                //     types:
                //
                //     Instance of BaseValidator - the validator property is set equal to this instance.
                //
                //     Array - if an array, it is assumed to be an array of validators, or validator definitions.
                //     The array will be passed to validatorFactory.createGroup(). The validator property
                //     will be set to the returned instance of ValidatorGroup
                //
                //     Object - an an object, it is assumbed to be a validator definition.
                //     The definition will be passed to validatorFactory.create(). The validator property
                //     will be set to the returned instance of BaseValdiator
                //

                if (BaseValidator.isValidator(value)){
                    this.validator = value;
                    this._validatorSet = true;
                    this._validate();
                    return;
                }

                if (lang.isArray(value)){
                    validatorFactory.createGroup(value).then(lang.hitch(this, function(validator){
                        this.validator = validator;
                        this._validatorSet = true;
                        this._validate();
                    }));
                    return;
                }

                validatorFactory.create(value['class'], value.options).then(lang.hitch(this, function(validator){
                    this.validator = validator;
                    this._validatorSet = true;
                    this._validate();
                }));
            },

            _validate: function(){

                if (! this._validatorSet || ! this._started){
                    return;
                }

                var state;
                var result = this.validator.isValid(this.get('value'));

                switch (true){
                    case BaseValidator.isDeferred(result):
                        result.then(lang.hitch(this, function(asyncResult){
                            var state;
                            if (asyncResult){
                                state = this._getChildrenState();
                            } else {
                                state = 'Error';
                            }
                            this._updateMessages(result, this.validator.get('messages'));
                            this.set('state', state);
                        }));
                        state = 'validating';
                        break;
                    case result:
                        this._updateMessages(result, this.validator.get('messages'));
                        state = this._getChildrenState();
                        break;
                    case !result:
                        this._updateMessages(result, this.validator.get('messages'));
                        state = 'Error';
                        break;
                }

                this.set('state', state);
            },

            _getChildrenState: function(){
                if (this._getState){
                    return this._getState();
                }
                return '';
            },

            _updateMessages: function(result, messages){

                if (result){
                    domClass.remove(this._messageStyleNode, 'error');
                    domClass.add(this.inlineMessage, 'hide');
                    domClass.add(this.blockMessage, 'hide');
                    this.inlineMessage.innerHTML = '';
                    this.blockMessage.innerHTML = '';
                } else {
                    domClass.add(this._messageStyleNode, 'error');
                    domClass.remove(this.inlineMessage, 'hide');
                    domClass.remove(this.blockMessage, 'hide');
                    if (messages.length > 1){
                        this.inlineMessage.innerHTML = '';
                       this.blockMessage.innerHTML = messages.join('<br />');
                    } else {
                        this.blockMessage.innerHTML = '';
                        this.inlineMessage.innerHTML = messages[0];
                    }
                }
            }
        }
    );
});
