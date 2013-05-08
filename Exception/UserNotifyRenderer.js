define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/keys',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    '../Widget/_DialogMixin',
    'dojo/text!./Template/ExceptionDialog.html'
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
    // Sds/Exception/UserNotifyRenderer

    var buttons = lang.mixin(DialogMixin.Buttons, {
        // summary:
        // Possible values of the button property in the return object.
        //
        // description:
        // OK: user aknowledgment that they have seen the exception notice
        OK: {name:'ok', keys: [
            {code: 89, ctrl: false},
            {code: 13, ctrl: false},
            {code: 78, ctrl: false},
            keys.ESCAPE
        ]}
    });

    var Dialog = declare(
        [Widget, TemplatedMixin, DialogMixin],
        {
            // templateString: string
            templateString: template,

            buttons: buttons,

            disableStateButtons: [],

            _setTitleAttr: { node: "titleNode", type: "innerHTML" },

            _setMessageAttr: { node: "messageNode", type: "innerHTML" },

            render: function(exceptionModel){
                this.set('title', exceptionModel.name);
                this.set('message', exceptionModel.message);
                this.show();
            }
        }
    );

    Dialog.buttons = buttons;
    return Dialog;
});
