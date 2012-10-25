define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-class',
    'Sds/Common/Validator/BaseValidator',
    'Sds/Common/Validator/validatorFactory',
    'dijit/_FocusMixin'
],
function (
    declare,
    lang,
    array,
    domClass,
    BaseValidator,
    validatorFactory,
    FocusMixin
){
    
    return declare(
        'Sds/Common/Form/_ValidationMixin',
        [FocusMixin],
        {
            // messagePosition: string
            //      Possible values are:
            //      auto: if the message is one line, display inline. If it is multiline, display block
            //      inline: always display message inline. If the message is more than one line, only the first will be shown.
            //      block: alwyas display message as block, even when there is only one line.
            messagePosition: 'auto',

            // surpressMessages: boolean
            //      Should message be returned to a get('message') call?
            surpressMessages: true,
            
            // onBlurSurpressMessages: boolean
            //      Value for surpressMessages afte the first onBlur event
            onBlurSurpressMessages: false,
            
            // state: [readonly] String
            //		Shows current state (ie, validation result) of input (""=Normal, Incomplete, or Error)
            state: '',

            // styleClasses: Object
            //      An object the defines the css classes that could be applied to _messageStyleNode
            //      when a validation failure occurs
            styleClasses: {
                none : [],
                success : ['success'],
                info : ['info'],
                warning : ['warning'],
                error : ['error']
            },
            
            // style: string
            //      A property name from the styleClasses object. This is the style which will be applied
            //      on validation failure
            style: 'info',
            
            // onBlurStyle: string
            //      The style to change to after blur event
            onBlurStyle: 'error',
            
            _validatorSet: false,

            // validator: an instance of Sds/Common/Validator/BaseValidator.
            validator: undefined,

            _messageStyleNode: undefined,

            startup: function(){
                this.inherited(arguments);
                this.validator.watch('messages', lang.hitch(this, function(prop, oldValue, newValue){
                    this._updateMessages(newValue)
                }));
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

            _getMessages: function(){
                if (this.surpressMessages){
                    return null;
                }
                return this.validator.get('messages');
            },
            
            _setSurpressMessagesAttr: function(value){
                this.surpressMessages = value;
                if (this._started){
                    this._updateMessages(this.validator.get('messages'));
                }
            },
            
            _onBlur: function(){
                this.set('style', this.onBlurStyle);
                this.set('surpressMessages', this.onBlurSurpressMessages);
                this.inherited(arguments);                
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
                            this._updateStyle(result);
                            this.set('state', state);
                        }));
                        state = 'validating';
                        break;
                    case result:
                        this._updateStyle(result);
                        state = this._getChildrenState();
                        break;
                    case !result:
                        this._updateStyle(result);
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

            _updateMessages: function(messages){
                if (messages.length == 0 || this.surpressMessages){
                    domClass.add(this.inlineMessageWrapper, 'hide');
                    domClass.add(this.blockMessageWrapper, 'hide');
                    this.inlineMessage.innerHTML = '';
                    this.blockMessage.innerHTML = '';                    
                    return;
                }
                if ((this.messagePosition == 'auto' && messages.length > 1) || this.messagePosition == 'block'){
                    this.inlineMessage.innerHTML = '';
                    this.blockMessage.innerHTML = messages.join('<br />');
                    domClass.remove(this.blockMessageWrapper, 'hide');                    
                } else {
                    this.blockMessage.innerHTML = '';
                    this.inlineMessage.innerHTML = messages[0];
                    domClass.remove(this.inlineMessageWrapper, 'hide');                    
                }                
            },
                        
            _updateStyle: function(result){
                                             
                var add = [];
                var remove = [];
                
                for(var item in this.styleClasses){
                    remove = remove.concat(this.styleClasses[item]);                    
                }
                
                if (!result){
                    add = this.styleClasses[this.style];
                    remove = array.filter(remove, function(item){
                        if(array.indexOf(add, item) == -1){
                            return true
                        } else {
                            return false
                        }                        
                    });
                }
                                    
                array.forEach(add, function(item){
                    domClass.add(this._messageStyleNode, item);                    
                }, this);
                array.forEach(remove, function(item){
                    domClass.remove(this._messageStyleNode, item);                    
                }, this);
            }
        }
    );
});
