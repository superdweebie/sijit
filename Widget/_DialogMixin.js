define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/_base/event',
    'dojo/Deferred',
    'dojo/on',
    'dojo/dom-prop',
    'dojo/dom-class',
    'dojo/dom-construct',
    '../string',
    '../Form/_FormMixin',
    'dijit/_OnDijitClickMixin',
    'bootstrap/Modal'
],
function (
    declare,
    lang,
    array,
    event,
    Deferred,
    on,
    domProp,
    domClass,
    domConstruct,
    string,
    FormMixin,
    OnDijitClickMixin,
    Modal
){
    // module:
    //		Sds/Widget/_DialogMixin

    var buttons = {
        // summary:
        //		Possible values of the button property in the return object.
        //
        // description:
        //      BACKDROP_CANCEL: indicates that the overlay was clicked to dismiss the dialog
        BACKDROP_CANCEL: 'backdropCancel'
    };

    var dialog = declare(
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

            _keypressHandlers: [],

            buildRendering: function(){

                // Add onClick handlers for any buttons that don't have them
                for (var index in this.buttons){
                    this._addClickHandler(this.buttons[index].name || this.buttons[index]);
                }

                this.inherited(arguments);
            },

            resetActivity: function(){
                array.forEach(this._decendants, function(widget){
                    if (widget.resetActivity){
                        widget.resetActivity();
                    }
                })
            },

            _addClickHandler: function(name){
                var functionName = 'on' + string.ucFirst(name) + 'Click';
                if (! this[functionName]){
                    this[functionName] = function(){
                        this.set('button', name);
                        this.hide();
                    }
                }
            },

            _addKeypressHandler: function(button){
                this._keypressHandlers.push(on(window, 'keydown', lang.hitch(this, function(evt){
                    if ( ! lang.isArray(button.keys)){
                        button.keys = [button.keys];
                    }

                    array.forEach(button.keys, lang.hitch(this, function(key){
                        if (
                            (typeof key == 'object' && (evt.charCode || evt.keyCode) == key.code && evt.ctrlKey == key.ctrl) ||
                            ((evt.charCode || evt.keyCode) == key)
                        ){
                            event.stop(evt);
                            this['on' + string.ucFirst(button.name) + 'Click']();
                        }
                    }));
                })))
            },

            postCreate: function(){
                this.inherited(arguments);
                this._modal = new Modal(this.domNode);
            },

            _updateDisableStateButtons: function(){
                // summary:
                //     Enables and disables the buttons when the state is changed

                for (var index in this.disableStateButtons){
                    if(this.state == '') {
                        domProp.set(this[this.disableStateButtons[index] + 'Node'], 'disabled', false);
                    } else {
                        domProp.set(this[this.disableStateButtons[index] + 'Node'], 'disabled', true);
                    }
                }
            },

            _setContentAttr: function(content){
                if (content.domNode){
                    domConstruct.empty(this.containerNode);
                    this.containerNode.appendChild(content.domNode);
                } else {
                    this.containerNode.innerHTML = content;
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
                this.hide();
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

                for (var index in this.buttons){
                    if (typeof this.buttons[index] == 'object'){
                        this._addKeypressHandler(this.buttons[index]);
                    }
                }

                this.set('value', value);

                if (this.visible){
                    return this._returnValueDeferred;
                }
                this.visible = true;
                this.button = undefined;

                this._returnValueDeferred = new Deferred();

                this.watch('state', lang.hitch(this, '_updateDisableStateButtons'));
                this.connectChildren();

                domClass.add(document.body, 'no-scroll');

                this._modal.show();
                on(this._modal.backdropNode, 'click', lang.hitch(this, 'onBackdropClick'));

                this._updateDisableStateButtons();
                return this._returnValueDeferred;
            },

            hide: function()
            {
                // summary:
                //    Hide the dialog. Calling this will resolve the deferred returned by show()

                array.forEach(this._keypressHandlers, function(handler){
                    handler.remove()
                });
                this._keyPressHandlers = [];

                this._modal.hide();

                domClass.remove(document.body, 'no-scroll');

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
