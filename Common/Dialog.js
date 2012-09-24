define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/on',
    'dojo/keys',
    'dojo/dom-prop',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'dijit/form/_FormMixin',
    'dijit/_OnDijitClickMixin',
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
    OnDijitClickMixin,
    Modal,
    template
){
    var buttons = {
        OK: 'ok',
        CANCEL: 'cancel',
        BACKDROP_CANCEL: 'backdropCancel'
    };

    var dialog = declare(
        'Sds/Common/Dialog',
        [Widget, TemplatedMixin, FormMixin, OnDijitClickMixin],
        {
            templateString: template,

            modal: undefined,

            button: undefined,

            visible: false,

            // Map widget attributes to DOMNode attributes.
            _setTitleAttr: [
                { node: "titleNode", type: "innerHTML" }
            ],

            postCreate: function(){
                this.inherited(arguments);
                this.modal = new Modal(this.domNode);
            },

            _updateOkDisabled: function(){
                // Enables and disables the ok button and ENTER key when the state is changed
                if(this.state == '')
                {
                    domProp.set(this.okButtonNode, 'disabled', false);
                } else {
                    domProp.set(this.okButtonNode, 'disabled', true);
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
                if (this.visible){
                    return null;
                }
                this.visible = true;
                this.button = undefined;

                this._returnValueDeferred = new Deferred();

                this.watch('state', lang.hitch(this, '_updateOkDisabled'));
                this.connectChildren();

                this.modal.show();
                on(this.modal.backdropNode, 'click', lang.hitch(this, 'onBackdropClick'));

                this._updateOkDisabled();
                return this._returnValueDeferred;
            },
            hide: function()
            {
                this.modal.hide();
                this.visible = false;

                var value = this.get('value');

                if(this._returnValueDeferred)
                {
                    this._returnValueDeferred.resolve(value)
                }

                return value;
            },
            onBackdropClick: function(){
                this.set('button', buttons.BACKDROP_CANCEL);
                this.visible = false;
                if(this._returnValueDeferred)
                {
                    this._returnValueDeferred.resolve(this.get('value'))
                }
            }
        }
    );

    dialog.buttons = buttons;

    return dialog;
});
