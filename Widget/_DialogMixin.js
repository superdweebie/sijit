define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/Deferred',
    'dojo/on',
    'dojo/dom-prop',
    'dojo/dom-class',
    'dojo/dom-construct',
    '../string',
    '../Form/_FormMixin',
    './_HideableMixin',
    'dojo/text!./Template/CloseButton.html'
],
function (
    declare,
    lang,
    array,
    Deferred,
    on,
    domProp,
    domClass,
    domConstruct,
    string,
    FormMixin,
    HideableMixin,
    closeButtonTemplate
){
    // module:
    //		Sds/Widget/_DialogMixin

    var buttons = {
        // summary:
        //		Possible values of the button property in the return object.
        //
        // description:
        //      BACKDROP_CANCEL: indicates that the overlay was clicked to dismiss the dialog
        BACKDROP_CANCEL: 'backdrop'
    };

    var dialog = declare(
        [FormMixin, HideableMixin],
        {
            // summary:
            //		An mixin for widgets similar to dijit/Dialog, but using twitter/bootstrap styling
            //
            // description:
            //		Creates a modal dialog box. Use the show() and hide() methods to
            //      iniitate and cancel.

            // buttons: array
            //     An array of button names to register onButtonClick event handlers for
            buttons: buttons,

            // button: string
            //     A value from the buttons array indicating which button was pressed to dismiss the dialog.
            button: undefined,

            closeButtonTemplate: closeButtonTemplate,

            _keypressHandlers: [],

            buildRendering: function(){

                // Add onClick handlers for any buttons that don't have them
                for (var index in this.buttons){
                    this._addClickHandler(this.buttons[index].name || this.buttons[index]);
                }
                this.inherited(arguments);
            },

            startup: function(){
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
                    this[functionName] = function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        this.set('button', name);
                        this.hide();
                    }
                }
            },

            onBackdropClick: function(e){
                // summary:
                //    Event called by the template when the backdrop is clicked.
                if (e.target == this.backdrop){
                    e.preventDefault();
                    e.stopPropagation();
                    this.set('button', buttons.BACKDROP_CANCEL);
                    this.hide();
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
                            evt.preventDefault();
                            this['on' + string.ucFirst(button.name) + 'Click']();
                        }
                    }));
                })))
            },

            _setContentAttr: function(content){
                if (content.domNode){
                    domConstruct.empty(this.containerNode);
                    this.containerNode.appendChild(content.domNode);
                } else {
                    this.containerNode.innerHTML = content;
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

                if (!this.hidden){
                    return this._returnValueDeferred;
                }

                this.inherited(arguments); //makes the dialog visible

                this._returnValueDeferred = new Deferred();
                return this._returnValueDeferred;
            },

            hide: function()
            {
                // summary:
                //    Hide the dialog. Calling this will resolve the deferred returned by show()

                this.inherited(arguments); //makes the dialog hidden

                var value = this.get('value');
                if(this._returnValueDeferred)
                {
                    this._returnValueDeferred.resolve(value)
                }
                return value;
            },

            _show: function(){

                for (var index in this.buttons){
                    if (typeof this.buttons[index] == 'object'){
                        this._addKeypressHandler(this.buttons[index]);
                    }
                }
                this.set('button', undefined);

                this.connectChildren();

                domClass.add(document.body, 'no-scroll');
                domClass.remove(this.domNode, 'hide');
            },

            _hide: function(){

                array.forEach(this._keypressHandlers, function(handler){
                    handler.remove()
                });
                this._keyPressHandlers = [];

                domClass.remove(document.body, 'no-scroll');
                domClass.add(this.domNode, 'hide');
            }
        }
    );

    dialog.buttons = buttons;

    return dialog;
});
