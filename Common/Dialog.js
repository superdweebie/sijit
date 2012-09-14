define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/on',
    'dojo/keys',
    'dojo/dom-prop',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'dijit/Form/_FormMixin',
    'bootstrap/Modal',
    'dojo/text!./Template/Dialog.html'
],
function (
    declare,
    lang,
    Deferred,
    on,
    keys,
    domProp,
    Widget,
    TemplatedMixin,
    FormMixin,
    Modal,
    template
){
    var buttons = {
        OK: 'ok',
        CANCEL: 'cancel'
    };

    var dialog = declare(
        'Sds/Common/Dialog',
        [Widget, TemplatedMixin, FormMixin],
        {
            templateString: template,

            modal: undefined,

            button: undefined,

            // Map widget attributes to DOMNode attributes.
            _setTitleAttr: [
                { node: "titleNode", type: "innerHTML" }
            ],

            _onPressEnterHandle: undefined,

            startup: function(){
                this.inherited(arguments);
                this.modal = new Modal(this.domNode);
            },

            _updateOkDisabled: function(){
                // Enables and disables the ok button and ENTER key when the state is changed
                if(this.state == '')
                {
                    domProp.set(this.okButtonNode, 'disabled', false);

                    // set up ENTER keyhandling
                    this._onPressEnterHandle = on(this, 'keydown', lang.hitch(this, function(event){
                        if(event.keyCode == keys.ENTER){
                            event.preventDefault();
                            this._onPressEnterHandle.remove();
                            this._onOk();
                        }
                    }));
                } else {
                    domProp.set(this.okButtonNode, 'disabled', true);
                    if (this._onPressEnterHandle) {
                        this._onPressEnterHandle.remove();
                    }
                }
            },

            _getValueAttr: function(){
                return {
                    state: this.get('state'),
                    button: this.get('button'),
                    value: this.inherited(arguments)
                }
            },

            onOk: function(){
                this.set('button', buttons.OK);
                this.hide();
            },

            onCancel: function(){
                this.set('button', buttons.CANCEL);
                this.hide();
            },

            show: function()
            {
                this._returnValueDeferred = new Deferred();

                this.watch('state', lang.hitch(this, '_updateOkDisabled'));
                this.connectChildren();

                this.modal.show();

                this._updateOkDisabled();
                return this._returnValueDeferred;
            },
            hide: function()
            {
                this.modal.hide();

                if(this._returnValueDeferred)
                {
                    this._returnValueDeferred.resolve(this.get('value'))
                }
                return this._returnValue;
            }
        }
    );

    dialog.buttons = buttons;

    return dialog;
});
