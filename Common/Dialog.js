define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/Deferred',
    'dojo/on',
    'dojo/keys',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./Template/Dialog.html',
    'dijit/Dialog',
    'dijit/form/Form',
    'dijit/form/Button'
],
function (
    declare,
    lang,
    Deferred,
    on,
    keys,
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    template
){
    var returnValues = {
        OK: 'ok',
        CANCEL: 'cancel'
    };

    var dialog = declare(
        'Sds/Common/Dialog',
        [Widget, TemplatedMixin, WidgetsInTemplateMixin],
        {
            templateString: template,

            title: undefined,

            state: '',

            _returnValue: returnValues.CANCEL,

            _onPressEnterHandle: undefined,

            _onOkButtonHandle: undefined,

            _updateOkDisabled: function(){
                // Enables and disables the ok button and ENTER key when the state is changed

                if(this.state == '')
                {
                    this.okButtonNode.set('disabled', false);

                    // set up ENTER keyhandling
                    this._onPressEnterHandle = on(this.dialogNode, 'keydown', lang.hitch(this, function(event){
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

            _onOk: function(){
                this._returnValue = returnValues.OK;
                this.hide();
            },

            show: function()
            {
                this._returnValueDeferred = new Deferred();

                this.dialogNode.set('title', this.title);
                this.watch('state', lang.hitch(this, '_updateOkDisabled'));
                this._onOkButtonHandle = on(this.okButtonNode, 'Click', lang.hitch(this, '_onOk'));
                this.dialogNode.show();
                this._updateOkDisabled();
                this.onShow();
                return this._returnValueDeferred;
            },
            onShow: function()
            {},
            hide: function()
            {
                this._onOkButtonHandle.remove();
                if(this._returnValueDeferred)
                {
                    this._returnValueDeferred.resolve(this._returnValue)
                }
                this.dialogNode.hide();
                this.onHide(this._returnValue);
            },
            onHide: function(value)
            {}
        }
    );

    dialog.returnValues = returnValues;

    return dialog;
});

