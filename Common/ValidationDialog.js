define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'Sds/Common/_DialogMixin',
    'Sds/Common/Form/_ValidationMixin',
    'dojo/text!./Template/ValidationDialog.html'
],
function (
    declare,
    lang,
    Widget,
    TemplatedMixin,
    DialogMixin,
    ValidationMixin,
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
        CANCEL: 'cancel',
        BACKDROP_CANCEL: 'backdropCancel'
    });

    var Dialog = declare(
        'Sds/Common/ValidationDialog',
        [Widget, TemplatedMixin, DialogMixin, ValidationMixin],
        {
            // templateString: string
            //      The widget template. To override this, use the paths directive on the AMD loader.
            templateString: template,

            buttons: buttons,
            
            suppressMessages: false,

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
            }
        }
    );

    Dialog.buttons = buttons;
    return Dialog;
});
