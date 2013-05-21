define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    '../array',
    'dojo/when',
    'dojo/Deferred',
    'dojo/dom-class',
    '../is',
    '../Validator/Base',
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
    is,
    ValidatorBase,
    ValidatorFactory,
    FocusMixin
){

    return declare(
        [FocusMixin],
        {
            // state: [readonly] String
            //		Shows current state (ie, validation result) of input (""=Normal, Incomplete, Error, Validating)
            state: '',

            //postActivity: undefined,

            validationStyle: {
                preActivity: {
                    //valid: [], //A list of classes to apply when valid
                    //invalid: [] //apply when invalid
                },
                postActivity: {
                    //valid: [], //apply when valid
                    invalid: ['error'] //apply when invalid
                }
            },

            //_appliedStyle: undefined,

            // validator: an instance of Sds/Validator/Base.
            //validator: undefined,

            //_onFocusValue: undefined,

            //lastResult: undefined,

            //_delayTimer: undefined,

            //Set to true to stop all validation. Set to falsey to allow validation
            //suppressValidation: undefined,

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
                        this.set('postActivity', true);
                    }
                }));

                this._startValidateTimer();
            },

            _setSuppressValidationAttr: function(value){
                if (this.suppressValidation && !value){
                    var doValidation = true;
                }
                this._set('suppressValidation', value);
                if (doValidation){
                    this._validateNow();
                }
            },

            _setPostActivityAttr: function(value){

                if (this.postActivity != value){
                    this.postActivity = value;
                    this.set('validationStyle', this.validationStyle);
                    this.set('lastResult', this.lastResult);
                }
            },

            _setLastResultAttr: function(value){
                this.lastResult = value;
                if (value){
                    this.set('validationMessages', value.messages);
                }
            },

            _setValueAttr: function(){
                // summary:
                //		Hook so set('value', ...) works.
                this._setValueTimestamp = new Date().getTime();
                this.set('state', 'Validating');
                this.inherited(arguments);
                this._startValidateTimer();
            },

            _setValidatorAttr: function(value){
                // summary:
                //     Will set the validator. May be one of three
                //     types:
                //
                //     Instance of Sds/Validator/Base - the validator property is set equal to this instance.
                //
                //     Array - if an array, it is assumed to be an array of validators, or validator definitions.
                //     The array will be passed to validatorFactory.create(). The validator property
                //     will be set to the returned instance of Validator/Group
                //
                //     Object - an an object, it is assumbed to be a validator definition.
                //     The definition will be passed to Sds/Validator/factory.create(). The validator property
                //     will be set to the returned instance of Sds/Validator/Base

                if (ValidatorBase.isValidator(value)){
                    this._set('validator', value);
                    this._startValidateTimer();
                    return;
                }

                var validatorDeferred = new Deferred;
                validatorDeferred.then(lang.hitch(this, function(validator){
                    this.set('validator', validator);
                }));

                when(ValidatorFactory.create(value), function(validator){
                    validatorDeferred.resolve(validator);
                });
            },

            _setValidationStyleAttr: function(value){
                if (this._started){

                    var styleNode = this.styleNode ?
                        this.styleNode :
                        this.containerNode ?
                            this.containerNode :
                            this.domNode,
                        apply = typeof value == 'array' ?
                            value :
                            typeof value == 'string' ?
                                [value] :
                                this.postActivity ?
                                    this.state == '' ?
                                        value.postActivity.valid :
                                        value.postActivity.invalid
                                    : this.state == '' ?
                                        value.preActivity.value :
                                        value.preActivity.invalid;

                    array.forEach(apply, function(item){
                        domClass.add(styleNode, item);
                    }, this);
                    array.forEach(array.subtract(this._appliedStyle, apply), function(item){
                        domClass.remove(styleNode, item);
                    }, this);
                    this._appliedStyle = apply;
                }
                this.inherited(arguments);
            },

            onFocus: function(){
                this.inherited(arguments);                
                this._onFocusValue = this._getValueToValidate();
            },

            onBlur: function(){
                this.set('postActivity', true);
                this.inherited(arguments);
                this._validateNow();
            },

            _startValidateTimer: function(){

                //Delay timer. Don't validate every single value change
                clearTimeout(this._delayTimer);
                this._delayTimer = setTimeout(lang.hitch(this, function(){
                    this._validateNow();
                }), this.delayTimeout);
            },

            _validateNow: function(){

                if (ValidatorBase.isValidator(this.validator) && this._started){
                    // Stop the delay timer and force an immediate validation
                    clearTimeout(this._delayTimer);
                    this._validate();
                } else {
                    this.set('state', '');
                }
            },

            _validate: function(){

                if (this.suppressValidation){
                    return;
                }

                var processResult = lang.hitch(this, function(resultObject, timestamp){

                    if (this._setValueTimestamp > timestamp){
                        // _validate has been called with a fresh value, so don't update the ui
                        return null;
                    }

                    var result = resultObject.result;
                    var state;

                    switch (true){
                        case (result === true):
                            state = this._getChildrenState();
                            break;
                        case (result === false):
                            state = 'Error';
                            break;
                        case is.isDeferred(result):
                            result.then(function(resultObject){
                                processResult(resultObject, timestamp);
                            });
                            state = 'Validating';
                            break;
                    }

                    this.set('state', state);
                    this.set('lastResult', resultObject);
                    this.set('validationStyle', this.validationStyle);
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
            }
        }
    );
});
