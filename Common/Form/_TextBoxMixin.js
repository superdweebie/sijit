define([
    'dojo/_base/declare',
    'dojo/keys',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/dom-prop',
    'dojo/dom-construct',
    'dijit/form/_FormValueMixin'
],
function (
    declare,
    keys,
    on,
    lang,
    domProp,
    domConstruct,
    FormValueMixin
){
    return declare(
        'Sds/Common/Form/_TextBoxMixin',
        [FormValueMixin],
        {
            // Lots of this code is copied across from dijit/form/_TextBoxMixin
            // Some of it is simplified. Some of it is massaged to work with
            // the validation system. Some is changed so that value and state
            // are always updated.
            //

            // trim: Boolean
            //		Removes leading and trailing whitespace if true.  Default is true.
            trim: true,

            // uppercase: Boolean
            //		Converts all characters to uppercase if true.  Default is false.
            uppercase: false,

            // lowercase: Boolean
            //		Converts all characters to lowercase if true.  Default is false.
            lowercase: false,

            // propercase: Boolean
            //		Converts the first character of each word to uppercase if true.
            propercase: false,

            // inputClasses: array
            //      An array of css classes to be applied directly to the native input tag
            inputClasses: [],

            // placeholder: string
            placeholder: undefined,

            // label: string
            label: undefined,

            _setPlaceholderAttr: function(value) {
                this.placeholder = value;

                if(this.placeholder) {
                    domProp.set(this.textbox, 'placeholder', this.placeholder);
                } else if (this.label){
                    domProp.set(this.textbox, 'placeholder', this.label);
                }
            },

            _setLabelAttr: function(value) {
                this.label = value;

                if (this.label){
                    domConstruct.create(
                        'label',
                        {innerHTML: this.label, 'class': 'control-label', 'for': this.id},
                        this.domNode,
                        'first'
                    );
                }
                if (!this.placeholder){
                    domProp.set(this.textbox, 'placeholder', this.label);
                }
            },
            
            _setHelpBlockAttr: function(message) {
                if (message){
                    domConstruct.create(
                        'span',
                        {innerHTML: '<small>'+message+'</small>', 'class': 'help-block'},
                        this.domNode,
                        'last'
                    );
                }
            },
            
            focusFormat: function(value /*=====, constraints =====*/){
                // summary:
                //		Replaceable function to convert a value to a properly formatted string.
                // value: String
                // constraints: Object
                // tags:
                //		protected extension
                return value == null /* or undefined */ ? "" : (value.toString ? value.toString() : value);
            },

            blurFormat: function(value /*=====, constraints =====*/){
                // summary:
                //		Replaceable function to convert a value to a properly formatted string.
                // value: String
                // constraints: Object
                // tags:
                //		protected extension
                return value == null /* or undefined */ ? "" : (value.toString ? value.toString() : value);
            },

            parse: function(value /*=====, constraints =====*/){
                // summary:
                //		Replaceable function to convert a formatted string to a value
                // value: String
                // constraints: Object
                // tags:
                //		protected extension

                return value;	// String
            },

            onFocus: function(e){
                this.textbox.value = this.focusFormat(this.textbox.value, this.constraints);
                this.inherited(arguments);
            },

            onBlur: function(e){
                this.textbox.value = this.blurFormat(this.textbox.value, this.constraints);
                this.inherited(arguments);
            },

            _skipFocusFormat: false,

            _setValueAttr: function(value){
                if (this.focused){
                    if (!this._skipFocusFormat){
                        this.textbox.value = this.focusFormat(value, this.constraints);
                    }
                } else {
                    this.textbox.value = this.blurFormat(value, this.constraints);
                }
                this.inherited(arguments, [this.parse(this.filter(value), this.constraints)]);
            },

            filter: function(val){
                // summary:
                //		Auto-corrections (such as trimming) that are applied to textbox
                //		value on blur or form submit.
                // description:
                //		For MappedTextBox subclasses, this is called twice
                //
                //		- once with the display value
                //		- once the value as set/returned by set('value', ...)
                //
                //		and get('value'), ex: a Number for NumberTextBox.
                //
                //		In the latter case it does corrections like converting null to NaN.  In
                //		the former case the NumberTextBox.filter() method calls this.inherited()
                //		to execute standard trimming code in TextBox.filter().
                //
                //		TODO: break this into two methods in 2.0
                //
                // tags:
                //		protected extension
                if(val === null){ return this._blankValue; }
                if(typeof val != "string"){ return val; }
                if(this.trim){
                    val = lang.trim(val);
                }
                if(this.uppercase){
                    val = val.toUpperCase();
                }
                if(this.lowercase){
                    val = val.toLowerCase();
                }
                if(this.propercase){
                    val = val.replace(/[^\s]+/g, function(word){
                        return word.substring(0,1).toUpperCase() + word.substring(1);
                    });
                }
                return val;
            },

            _setFocusNodeClassAttr: { node: "focusNode", type: "class" },

            onInput: function(){},

            __skipInputEvent: false,

            _onInput: function(/*Event*/ evt){
                // summary:
                //		Called AFTER the input event has happened
                this._skipFocusFormat = true;
                this.set('value', this.textbox.value);
                this._skipFocusFormat = false;
            },

            postCreate: function(){
                // setting the value here is needed since value="" in the template causes "undefined"
                // and setting in the DOM (instead of the JS object) helps with form reset actions
                this.textbox.setAttribute("value", this.textbox.value); // DOM and JS values should be the same

                this.inherited(arguments);

                // normalize input events to reduce spurious event processing
                //	onkeydown: do not forward modifier keys
                //		       set charOrCode to numeric keycode
                //	onkeypress: do not forward numeric charOrCode keys (already sent through onkeydown)
                //	onpaste & oncut: set charOrCode to 229 (IME)
                //	oninput: if primary event not already processed, set charOrCode to 229 (IME), else do not forward
                var handleEvent = function(e){
                    var charOrCode;
                    if(e.type == "keydown"){
                        charOrCode = e.keyCode;
                        switch(charOrCode){ // ignore state keys
                            case keys.SHIFT:
                            case keys.ALT:
                            case keys.CTRL:
                            case keys.META:
                            case keys.CAPS_LOCK:
                            case keys.NUM_LOCK:
                            case keys.SCROLL_LOCK:
                                return;
                        }
                        if(!e.ctrlKey && !e.metaKey && !e.altKey){ // no modifiers
                            switch(charOrCode){ // ignore location keys
                                case keys.NUMPAD_0:
                                case keys.NUMPAD_1:
                                case keys.NUMPAD_2:
                                case keys.NUMPAD_3:
                                case keys.NUMPAD_4:
                                case keys.NUMPAD_5:
                                case keys.NUMPAD_6:
                                case keys.NUMPAD_7:
                                case keys.NUMPAD_8:
                                case keys.NUMPAD_9:
                                case keys.NUMPAD_MULTIPLY:
                                case keys.NUMPAD_PLUS:
                                case keys.NUMPAD_ENTER:
                                case keys.NUMPAD_MINUS:
                                case keys.NUMPAD_PERIOD:
                                case keys.NUMPAD_DIVIDE:
                                    return;
                            }
                            if((charOrCode >= 65 && charOrCode <= 90) || (charOrCode >= 48 && charOrCode <= 57) || charOrCode == keys.SPACE){
                                return; // keypress will handle simple non-modified printable keys
                            }
                            var named = false;
                            for(var i in keys){
                                if(keys[i] === e.keyCode){
                                    named = true;
                                    break;
                                }
                            }
                            if(!named){ return; } // only allow named ones through
                        }
                    }
                    charOrCode = e.charCode >= 32 ? String.fromCharCode(e.charCode) : e.charCode;
                    if(!charOrCode){
                        charOrCode = (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == keys.SPACE ? String.fromCharCode(e.keyCode) : e.keyCode;
                    }
                    if(!charOrCode){
                        charOrCode = 229; // IME
                    }
                    if(e.type == "keypress"){
                        if(typeof charOrCode != "string"){ return; }
                        if((charOrCode >= 'a' && charOrCode <= 'z') || (charOrCode >= 'A' && charOrCode <= 'Z') || (charOrCode >= '0' && charOrCode <= '9') || (charOrCode === ' ')){
                            if(e.ctrlKey || e.metaKey || e.altKey){ return; } // can only be stopped reliably in keydown
                        }
                    }
                    if(e.type == "input"){
                        if(this.__skipInputEvent){ // duplicate event
                            this.__skipInputEvent = false;
                            return;
                        }
                    }else{
                        this.__skipInputEvent = true;
                    }
                    // create fake event to set charOrCode and to know if preventDefault() was called
                    var faux = { faux: true }, attr;
                    for(attr in e){
                        if(attr != "layerX" && attr != "layerY"){ // prevent WebKit warnings
                            var v = e[attr];
                            if(typeof v != "function" && typeof v != "undefined"){ faux[attr] = v; }
                        }
                    }
                    lang.mixin(faux, {
                        charOrCode: charOrCode,
                        _wasConsumed: false,
                        preventDefault: function(){
                            faux._wasConsumed = true;
                            e.preventDefault();
                        },
                        stopPropagation: function(){ e.stopPropagation(); }
                    });
                    // give web page author a chance to consume the event
                    //console.log(faux.type + ', charOrCode = (' + (typeof charOrCode) + ') ' + charOrCode + ', ctrl ' + !!faux.ctrlKey + ', alt ' + !!faux.altKey + ', meta ' + !!faux.metaKey + ', shift ' + !!faux.shiftKey);
                    if(this.onInput(faux) === false){ // return false means stop
                        faux.preventDefault();
                        faux.stopPropagation();
                    }
                    if(faux._wasConsumed){ return; } // if preventDefault was called
                    this.defer(function(){ this._onInput(faux); }); // widget notification after key has posted
                };
                this.own(on(this.textbox, "keydown, keypress, paste, cut, input, compositionend", lang.hitch(this, handleEvent)));
            }
        }
    );
});
