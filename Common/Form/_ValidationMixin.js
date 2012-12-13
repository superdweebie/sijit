define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/when',
    'dojo/Deferred',
    'dojo/dom-class',
    'Sds/Common/utils',
    'get!ValidatorFactory',
    'dijit/_FocusMixin'
],
function (
    declare,
    lang,
    array,
    when,
    Deferred,
    domClass,
    utils,
    ValidatorFactory,
    FocusMixin
){

    return declare(
        'Sds/Common/Form/_ValidationMixin',
        [FocusMixin],
        {
            // state: [readonly] String
            //		Shows current state (ie, validation result) of input (""=Normal, Incomplete, or Error)
            state: '',

            // suppressMessages: boolean
            //      Should message be returned to a get('message') call?
            suppressMessages: true,

            preActivitySuppressMessages: true,

            // postActivitySuppressMessages: boolean
            //      Value for suppressMessages after the first onBlur event
            //      or if the state changes from valid to invalid while having focus
            postActivitySuppressMessages: false,

            // styleClasses: Object
            //      An object the defines the css classes that could be applied to this.domNode
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

            preActivityStyle: 'info',

            // onBlurStyle: string
            //      The style to change to after blur event
            //      or if the state changes from valid to invalid while having focus
            postActivityStyle: 'error',

            _validatorSet: false,

            // validator: an instance of Sds/Common/Validator/BaseValidator.
            validator: undefined,

            _onFocusValue: undefined,

            messages: [],

            _delayTimer: undefined,

            delayTimeout: 350,

            _setValueTimestamp: 0,

            startup: function(){
                this.inherited(arguments);
                
                this.watch('state', lang.hitch(this, function(p, o, newValue){
                    if (newValue == '' ||
                        (newValue != '' &&
                        this._onFocusValue != undefined &&
                        this._onFocusValue != '' &&
                        this.get('focused'))
                    ){
                        this.set('style', this.postActivityStyle);
                        this.set('suppressMessages', this.postActivitySuppressMessages);
                    }
                }));

                this._startValidateTimer();
            },

            resetActivity: function(){
                this.set('style', this.preActivityStyle);
                this.set('suppressMessages', this.preActivitySuppressMessages);
            },

            _setValueAttr: function(){
                // summary:
                //		Hook so set('value', ...) works.
                this._setValueTimestamp = new Date().getTime();
                this.inherited(arguments);
                this._startValidateTimer();
            },

            _setValidatorAttr: function(value){
                // summary:
                //     Will set the validator. The value must be an instance of BaseValidator parameter may be one of three
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
                    this._startValidateTimer();
                }));

                when(ValidatorFactory.create(value), function(validator){
                    validatorDeferred.resolve(validator);
                });
            },

            _getMessagesAttr: function(){
                if (this.suppressMessages){
                    return null;
                }
                return this.messages;
            },

            _setMessagesAttr: function(value){
                this.messages = value;
                this._updateMessages();
            },

            _setSuppressMessagesAttr: function(value){
                this.suppressMessages = value;
                if (this._started && this.validator){
                    this._updateMessages();
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

            onFocus: function(){
                this._onFocusValue = this._getValueToValidate();
            },

            onBlur: function(){
                this.set('style', this.postActivityStyle);
                this.set('suppressMessages', this.postActivitySuppressMessages);
                this.inherited(arguments);
                this._validateNow();
            },

            _startValidateTimer: function(){

                if (! this._validatorSet || ! this._started){
                    return;
                }

                //Put in delay timer. Don't validate every single value change
                clearTimeout(this._delayTimer);
                this._delayTimer = setTimeout(lang.hitch(this, function(){
                    this._validate();
                }), this.delayTimeout);
            },

            _validateNow: function(){

                if (! this._validatorSet || ! this._started){
                    return;
                }

                // Stop the delay timer and force an immediate validation
                clearTimeout(this._delayTimer);
                this._validate();
            },

            _validate: function(){

                var processResult = lang.hitch(this, function(resultObject, timestamp){

                    if (this._setValueTimestamp > timestamp){
                        // _validate has been called with a fresh value, so don't update the ui
                        return null;
                    }

                    var result = resultObject.result;
                    var state;

                    switch (true){
                        case (result === true):
                            this._updateStyle(result);
                            state = this._getChildrenState();
                            break;
                        case (result === false):
                            this._updateStyle(result);
                            state = 'Error';
                            break;
                        case utils.isDeferred(result):
                            result.then(function(resultObject){
                                processResult(resultObject, timestamp);
                            });
                            state = 'validating';
                            break;
                    }

                    this.set('messages', resultObject.messages);
                    this.set('state', state);
                    return null;
                });

                var value = this._getValueToValidate();
                processResult(this.validator.isValid(value), new Date().getTime());
            },

            _getValueToValidate: function(){
                return this.get('value');
            },

            _getChildrenState: function(){
                
                if ( ! this._descendants){
                    return '';                    
                }
                
                var states = array.map(this._descendants, function(w){
                    return w.get("state") || "";
                });

                return array.indexOf(states, "Error") >= 0 ? "Error" :
                    array.indexOf(states, "Incomplete") >= 0 ? "Incomplete" : "";                            
            },

            _getState: function(){
                return this.state;
            },
            
            _updateMessages: function(){
                if (this.validationMessage){                    
                    if (this.suppressMessages){
                        this.validationMessage.hide();                          
                    } else {
                        this.validationMessage.show(this.get('messages'));                   
                    }
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

                var styleNode;
                if (this.containerNode){
                    styleNode = this.containerNode;
                } else {
                    styleNode = this.domNode;
                }
                
                array.forEach(add, function(item){
                    domClass.add(styleNode, item);
                }, this);
                array.forEach(remove, function(item){
                    domClass.remove(styleNode, item);
                }, this);
            }
        }
    );
});
