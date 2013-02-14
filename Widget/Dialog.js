define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/keys',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    './_DialogMixin',
    'dojo/text!./Template/Dialog.html'
],
function (
    declare,
    lang,
    keys,
    Widget,
    TemplatedMixin,
    DialogMixin,
    template
){
    // module:
    //		Sds/Widget/Dialog

    var buttons = lang.mixin(DialogMixin.Buttons, {
        // summary:
        //		Possible values of the button property in the return object.
        //
        // description:
        //      OK: indicates that the 'ok' button was clicked to dismiss the dialog
        //      CANCEL: indicates that a 'cancel' button was clicked to dismiss the dialog
        //
        //      Hotkeys are also defined.
        OK: {name: 'ok', keys: keys.ENTER},
        CANCEL: {name: 'cancel', keys: keys.ESCAPE}
    });

    var Dialog = declare(
        [Widget, TemplatedMixin, DialogMixin],
        {
            // templateString: string
            templateString: template,

            buttons: buttons,

            disableStateButtons: ['ok'],

            _setTitleAttr: { node: "titleNode", type: "innerHTML" }
        }
    );

    Dialog.buttons = buttons;
    return Dialog;
});
