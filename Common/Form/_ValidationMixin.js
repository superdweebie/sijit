define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/Deferred',
    'dojo/dom-class',
    'dojox/timing',
    'Sds/Common/Validator/BaseValidator',
    'Sds/Common/Validator/validatorFactory',
    'Sds/Common/utils',
    'dijit/_FocusMixin'
],
function (
    declare,
    lang,
    array,
    Deferred,
    domClass,
    timing,
    BaseValidator,
    validatorFactory,
    utils,
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

            // suppressMessages: boolean
            //      Should message be returned to a get('message') call?
            suppressMessages: true,

            // onBlurSuppressMessages: boolean
            //      Value for suppressMessages afte the first onBlur event
            onBlurSuppressMessages: false,

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

            _delayTimer: undefined,

            delayTimeout: 500,

            startup: function(){
                this.inherited(arguments);
                this._delayTimer = new timing.Timer(this.delayTimeout);
                this._delayTimer.onTick = lang.hitch(this, function(){
                    this._delayTimer.stop();
                    this._validate();
                });
                this._startValidateTimer();
            },

            _setValueAttr: function(){
                // summary:
                //		Hook so set('value', ...) works.
                this.inherited(arguments);
                this._startValidateTimer();
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

                var validatorDeferred = new Deferred;
                validatorDeferred.then(lang.hitch(this, function(validator){
                    this.validator = validator;
                    this._validatorSet = true;
                    this.validator.watch('messages', lang.hitch(this, function(prop, oldValue, newValue){
                        this._updateMessages(newValue)
                    }));
                    this._startValidateTimer();
                }));

                validatorFactory.create(value).then(function(validator){
                    validatorDeferred.resolve(validator);
                });
            },

            _getMessages: function(){
                if (this.suppressMessages){
                    return null;
                }
                return this.validator.get('messages');
            },

            _setSuppressMessagesAttr: function(value){
                this.suppressMessages = value;
                if (this._started && this.validator){
                    this._updateMessages(this.validator.get('messages'));
                }
            },

            _setStyleAttr: function(value){
                this.style = value;
                if (this._started){
                    if (this.state == ''){
                        this._updateStyle(true);
                    } else {
                        this._updateStyle(false);
                    }
                }
            },

            onBlur: function(){
                this.set('style', this.onBlurStyle);
                this.set('suppressMessages', this.onBlurSuppressMessages);
                this.inherited(arguments);
            },

            _startValidateTimer: function(){

                if (! this._validatorSet || ! this._started){
                    return;
                }

                //Put in delay timer. Don't validate every single value change
                if ( ! this._delayTimer.isRunning){
                    this._delayTimer.start();
                } else {
                    this._delayTimer.stop(); //reset timer
                    this._delayTimer.start();
                }
            },

            _validate: function(){

                var state;
                var result = this.validator.isValid(this._getValueToValidate());

                switch (true){
                    case (result === true):
                        this._updateStyle(result);
                        state = this._getChildrenState();
                        break;
                    case (result === false):
                        this._updateStyle(result);
                        state = 'Error';
                        break;
                    case BaseValidator.isDeferred(result):
                        result.then(lang.hitch(this, function(asyncResult){
                            var state;
                            if (asyncResult){
                                state = this._getChildrenState();
                            } else {
                                state = 'Error';
                            }
                            this._updateStyle(asyncResult);
                            this.set('state', state);
                        }));
                        state = 'validating';
                        break;
                }

                this.set('state', state);
            },

            _getValueToValidate: function(){
                return this.get('value');
            },

            _getChildrenState: function(){
                if (this._getState){
                    return this._getState();
                }
                return '';
            },

            _updateMessages: function(messages){
                if (messages.length == 0 || this.suppressMessages){
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
                    remove = utils.arraySubtract(remove, add);
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
