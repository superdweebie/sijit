define ([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/aspect',
    'dijit/Tooltip',
    'dijit/_Widget'
],
function (
    declare,
    lang,
    aspect,
    Tooltip,
    Widget
){
    return declare (
        'Sds/View/FormValidatorMessage',
        [Widget],
        {
            value: undefined,

            state: undefined,

            tooltipDomNode: undefined,

            // tooltipPosition: String[]
            //		See description of `dijit/Tooltip.defaultPosition` for details on this parameter.
            tooltipPosition: [],

            owningForm: undefined,

            _focusWatchHandle: undefined,

            _setValueAttr: function(value){
                if (value != this.value){
                    this.value = value;

                    var state;
                    if (value == ''){
                        state = '';
                    } else {
                        state = 'Error';
                    }

                    if (state != this.state){
                        this.state = state;
                        this.owningForm._onChildChange('state');
                    } else {
                        this.owningForm._onChildChange('value');
                    }

                    this.displayMessage();
                }
            },

            displayMessage: function(){

                // If form hasn't started, delay message display until it has
                if ( ! this.owningForm._started){
                    aspect.after(this.owningForm, 'startup', lang.hitch(this, function(){
                        this.displayMessage();
                    }));
                    return;
                }

                if( ! this.value || this.value == ''){
                    if (this._focusWatchHandle){
                        this._focusWatchHandle.unwatch();
                        this._focusWatchHandle = undefined;
                    }
                    this._unfocus();
                }else{
                    if (! this._focusWatchHandle){
                        this._focusWatchHandle = this.owningForm.watch('focused', lang.hitch(this, function(property, oldValue, newValue){
                            if (newValue){
                                this._focus();
                            } else {
                                this._unfocus();
                            }
                        }));
                    }
                    this._focus();
                }
            },

            _focus: function(){
                Tooltip.show(this.value, this.tooltipDomNode, this.tooltipPosition, !this.isLeftToRight());
            },

            _unfocus: function(){
                Tooltip.hide(this.tooltipDomNode);
            }
        }
    );
});
