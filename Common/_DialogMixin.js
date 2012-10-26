define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/on',
    'dojo/dom-prop',
    'Sds/Common/Form/_FormMixin',
    'dijit/_OnDijitClickMixin',
    'bootstrap/Modal'
],
function (
    declare,
    lang,
    Deferred,
    on,
    domProp,
    FormMixin,
    OnDijitClickMixin,
    Modal
){
    // module:
    //		Sds/Common/_DialogMixin

    var buttons = {
        // summary:
        //		Possible values of the button property in the return object.
        //
        // description:
        //      OK: indicates that the 'ok' button was clicked to dismiss the dialog
        //      CANCEL: indicates that a 'cancel' button was clicked to dismiss the dialog
        //      BACKDROP_CANCEL: indicates that the overlay was clicked to dismiss the dialog

        OK: 'ok',
        CANCEL: 'cancel',
        BACKDROP_CANCEL: 'backdropCancel'
    };

    var dialog = declare(
        'Sds/Common/_DialogMixin',
        [FormMixin, OnDijitClickMixin],
        {
            // summary:
            //		An mixin for widgets similar to dijit/Dialog, but using twitter/bootstrap styling
            //
            // description:
            //		Creates a modal dialog box. Use the show() and hide() methods to
            //      iniitate and cancel.

            // _modaul: bootsrap/Modal
            //     This is what does most of the work.
            _modal: undefined,

            // button: string
            //     A value from the buttons array indicating which button was pressed to dismiss the dialog.
            button: undefined,

            // visible: boolean
            //     Indicates if the modal is visible/active
            visible: false,

            // title: string
            //     Text that appears at the top of the modal
            title: '',

            _setTitleAttr: { node: "titleNode", type: "innerHTML" },

            postCreate: function(){
                this.inherited(arguments);
                this._modal = new Modal(this.domNode);
            },

            _updateOkDisabled: function(){
                // summary:
                //     Enables and disables the ok button when the state is changed

                if(this.state == '') {
                    domProp.set(this.okButtonNode, 'disabled', false);
                } else {
                    domProp.set(this.okButtonNode, 'disabled', true);
                }
            },

            _getValueAttr: function(){
                // summary:
                //     The value of the dialog is a composite object:
                //
                //     state: Because the dialog also acts as a form, this is the current state of the form. An empty string
                //         indicates the state is ok. A non-empty string indicates there is some kind of error.
                //
                //     button: A value from the buttons array indicating which button was pressed to dismiss the dialog.
                //
                //     value: the value of the form.

                return {
                    state: this.get('state'),
                    button: this.get('button'),
                    value: this.inherited(arguments)
                }
            },

            onOk: function(){
                // summary:
                //    Event called by the template when the ok button is clicked.
                this.set('button', buttons.OK);
                this.hide();
            },

            onCancel: function(){
                // summary:
                //    Event called by the template when a cancel button is clicked.
                this.set('button', buttons.CANCEL);
                this.hide();
            },

            onBackdropClick: function(){
                // summary:
                //    Event called by the template when the backdrop is clicked.
                this.set('button', buttons.BACKDROP_CANCEL);
                this.visible = false;
                if(this._returnValueDeferred)
                {
                    this._returnValueDeferred.resolve(this.get('value'))
                }
            },

            show: function(/*object*/value)
            {
                // summary:
                //    Display the dialog
                //
                // value: Optional. A value object that can be used to set the form.
                //
                // returns: A deferred that will resolve to the dialog value when the
                //          dialog is hidden

                this.set('value', value);

                if (this.visible){
                    return this._returnValueDeferred;
                }
                this.visible = true;
                this.button = undefined;

                this._returnValueDeferred = new Deferred();

                this.watch('state', lang.hitch(this, '_updateOkDisabled'));
                this.connectChildren();

                this._modal.show();
                on(this._modal.backdropNode, 'click', lang.hitch(this, 'onBackdropClick'));

                this._updateOkDisabled();
                return this._returnValueDeferred;
            },

            hide: function()
            {
                // summary:
                //    Hide the dialog. Calling this will resolve the deferred returned by show()

                this._modal.hide();
                this.visible = false;

                var value = this.get('value');

                if(this._returnValueDeferred)
                {
                    this._returnValueDeferred.resolve(value)
                }

                return value;
            }
        }
    );

    dialog.buttons = buttons;

    return dialog;
});
