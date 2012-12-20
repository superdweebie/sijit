define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',  
    'Sds/Common/_DialogMixin',
    'Sds/Common/Form/_ValidationMixin',
    'Sds/Common/Form/_ValidationMessagesMixin',    
    'dojo/text!./Template/ValidationDialog.html'   
],
function (
    declare,
    lang,
    Widget,
    TemplatedMixin,
    DialogMixin,
    ValidationMixin,
    ValidationMessagesMixin,    
    template
){
    // module:
    //		Sds/Common/ValidationDialog

    var buttons = lang.mixin(DialogMixin.Buttons, {
        // summary:
        //		Possible values of the button property in the return object.
        //
        // description:
        //      OK: indicates that the 'ok' button was clicked to dismiss the dialog
        //      CANCEL: indicates that a 'cancel' button was clicked to dismiss the dialog
        OK: 'ok',
        CANCEL: 'cancel'
    });

    var Dialog = declare(
        'Sds/Common/ValidationDialog',
        [Widget, TemplatedMixin, DialogMixin, ValidationMixin, ValidationMessagesMixin],
        {
            // templateString: string
            //      The widget template. To override this, use the paths directive on the AMD loader.
            templateString: template,

            // message: String
            //		Current error/prompt message.
            message: '',

            messagePosition: 'auto',
            
            buttons: buttons,

            disableStateButtons: ['ok'],

            suppressMessages: false,

            _setTitleAttr: { node: "titleNode", type: "innerHTML" },

            postCreate: function(){
                this._messageStyleNode = this.formValidatorMessage;
                this.watch('value', function(){
                    this._startValidateTimer();
                });
                this.inherited(arguments);
            },

            _getIinvalidWidgetsAttr: function(){
                var result = this.inherited(arguments);
                if (this._getChildrenState() == '' && this.get('state') != ''){
                    result.push(this);
                }
                return result;
            },

            _getValueToValidate: function(){
                return this.get('value').value;
            },

            resetActivity: function(){
                this.inherited(arguments);
                for(var index in this._descendants){
                    var widget = this._descendants[index];
                    if (widget.resetActivity){
                        widget.resetActivity();
                    }
                }
            }
        }
    );

    Dialog.buttons = buttons;
    return Dialog;
});
