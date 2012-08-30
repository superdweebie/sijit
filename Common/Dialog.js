define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/Deferred',
    'dojo/on',
    'dojo/keys',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/Dialog',
    'dojo/text!./Template/Dialog.html',
    'dijit/form/Button',
    'dijit/form/TextBox'
],
function (
    declare,
    lang,
    Deferred,
    on,
    keys,
    WidgetsInTemplateMixin,
    Dialog,
    template
){
    var buttons = {
        OK: 'ok',
        CANCEL: 'cancel'
    };

    var dialog = declare(
        'Sds/Common/Dialog',
        [Dialog, WidgetsInTemplateMixin],
        {
            templateString: template,

            button: undefined,

            _onPressEnterHandle: undefined,

            _updateOkDisabled: function(){
                // Enables and disables the ok button and ENTER key when the state is changed
                if(this.state == '')
                {
                    this.okButtonNode.set('disabled', false);

                    // set up ENTER keyhandling
                    this._onPressEnterHandle = on(this, 'keydown', lang.hitch(this, function(event){
                        if(event.keyCode == keys.ENTER){
                            event.preventDefault();
                            this._onPressEnterHandle.remove();
                            this._onOk();
                        }
                    }));
                } else {
                    this.okButtonNode.set('disabled', true);
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
                this.inherited(arguments);
            },

            show: function()
            {
                this._returnValueDeferred = new Deferred();

                this.watch('state', lang.hitch(this, '_updateOkDisabled'));
                this.connectChildren();

                this.inherited(arguments);

                this._updateOkDisabled();
                return this._returnValueDeferred;
            },
            hide: function()
            {
                this.inherited(arguments);

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

