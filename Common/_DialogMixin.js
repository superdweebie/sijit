define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/on',
    'dojo/dom-prop',
    'Sds/Common/utils',
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
    utils,
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
        //      BACKDROP_CANCEL: indicates that the overlay was clicked to dismiss the dialog
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

            // _modal: bootsrap/Modal
            //     This is what does most of the work.
            _modal: undefined,

            // buttons: array
            //     An array of button names to register onButtonClick event handlers for
            buttons: buttons,

            // button: string
            //     A value from the buttons array indicating which button was pressed to dismiss the dialog.
            button: undefined,

            // diableStateButtons: array
            //     An array of button nodes that should be disabled when the state is invalid
            disableStateButtons: undefined,

            // visible: boolean
            //     Indicates if the modal is visible/active
            visible: false,

            buildRendering: function(){

                // Add onClick handlers for any buttons that don't have them
                var functionName;
                for (var index in this.buttons){
                    functionName = 'on' + utils.ucFirst(this.buttons[index]) + 'Click';
                    if (! this[functionName]){
                        this._addClickHandler(functionName, this.buttons[index]);
                    }
                }

                this.inherited(arguments);
            },

            _addClickHandler: function(functionName, buttonValue){
                this[functionName] = function(){
                    this.set('button', buttonValue);
                    this.hide();
                }
            },

            postCreate: function(){
                this.inherited(arguments);
                this._modal = new Modal(this.domNode);
            },

            _updateDisableStateButtons: function(){
                // summary:
                //     Enables and disables the buttons when the state is changed

                for (var item in this.disableStateButtons){
                    if(this.state == '') {
                        domProp.set(this[this.disableStateButtons[item] + 'Node'], 'disabled', false);
                    } else {
                        domProp.set(this[this.disableStateButtons[item] + 'Node'], 'disabled', true);
                    }
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

                this.watch('state', lang.hitch(this, '_updateDisableStateButtons'));
                this.connectChildren();

                this._modal.show();
                on(this._modal.backdropNode, 'click', lang.hitch(this, 'onBackdropClick'));

                this._updateDisableStateButtons();
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
