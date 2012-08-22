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
    return declare(
        'Sds/Common/Dialog',
        [Widget, TemplatedMixin, WidgetsInTemplateMixin],
        {
            templateString: template,

            title: undefined,

            validator: undefined,

            _onPressEnterHandle: undefined,

            _getValueAttr: function(){
                return this.formNode.get('value');
            },
            _setValueAttr: function(value){
                return this.formNode.set('value', value);
            },
            _getStateAttr: function(){
                return this.formNode.get('state');
            },
            _setStateAttr: function(value)
            {
                this.formNode.set('state', value);
            },
            _updateState: function(){
                var formState = this.formNode.get('state');
                if(this.validator){
                    formState = this.validator(formState, this.formNode.get('value'));
                    this.formNode.set('state', formState);
                }
                if(formState == '')
                {
                    this.okButtonNode.set('disabled', false);

                    // set up ENTER keyhandling for the search keyword input field
                    this._onPressEnterHandle = on(this.dialogNode, 'keydown', lang.hitch(this, function(event){
                        if(event.keyCode == keys.ENTER){
                            event.preventDefault();
                            this._onPressEnterHandle.remove();
                            this.hide();
                        }
                    }));
                } else {
                    this.okButtonNode.set('disabled', true);
                    if (this._onPressEnterHandle) {
                        this._onPressEnterHandle.remove();
                    }
                }
            },
            reset: function(){
                return this.formNode.reset();
            },
            show: function()
            {
                this._returnValueDeferred = new Deferred();
                this.dialogNode.set('title', this.title);
                this.formNode.watch('state', lang.hitch(this, '_updateState'));
                on(this.okButtonNode, 'Click', lang.hitch(this, 'hide'));
                this.dialogNode.show();
                this._updateState();
                this.onShow();
                return this._returnValueDeferred;
            },
            onShow: function()
            {},
            hide: function()
            {
                var value = this.formNode.get('value');
                if(this._returnValueDeferred)
                {
                    this._returnValueDeferred.resolve(value)
                }
                this.dialogNode.hide();
                this.onHide(value);
            },
            onHide: function(value)
            {}
        }
    );
});

