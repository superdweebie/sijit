define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'Sds/Common/_DialogMixin',
    'dojo/text!./Template/Dialog.html'
],
function (
    declare,
    lang,
    Widget,
    TemplatedMixin,
    DialogMixin,
    template
){
    // module:
    //		Sds/Common/Dialog

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
        'Sds/Common/Dialog',
        [Widget, TemplatedMixin, DialogMixin],
        {
            // templateString: string
            //      The widget template. To override this, use the paths directive on the AMD loader.
            templateString: template,

            buttons: buttons,

            disableStateButtons: ['ok'],

            _setTitleAttr: { node: "titleNode", type: "innerHTML" },

            resetActivity: function(){
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
