define
(
    [
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/_base/Deferred',
        'dojo/on',
        'dijit/_Widget',
        'dijit/_TemplatedMixin',
        'dijit/_WidgetsInTemplateMixin',
        'dojo/text!./Template/Dialog.html',
        'dijit/Dialog',
        'dijit/form/Form',
        'dijit/form/Button'
    ],
    function
    (
        declare,
        lang,
        Deferred,
        on,
        widget,
        templatedMixin,
        widgetsInTemplateMixin,
        template
    )
    {
        return declare
        (
            'sijit.Common.Dialog',
            [widget, templatedMixin, widgetsInTemplateMixin],
            {
                templateString: template,
                title: undefined,
                validator: undefined,
                getFormValue: function()
                {
                    return this.formNode.get('value');
                },
                setFormValue: function(value){
                    return this.formNode.set('value', value);
                },
                resetForm: function(){
                    return this.formNode.reset();
                },
                stateChange: function()
                {
                    var state = this.formNode.get('state');
                    if(this.validator){
                        state = this.validator(state, this.formNode.get('value'));
                        this.formNode.set('state', state);
                    }
                    if(state == '')
                    {
                        this.okButtonNode.set('disabled', false);
                    } else {
                        this.okButtonNode.set('disabled', true);
                    }
                },
                show: function()
                {
                    this._returnValueDeferred = new Deferred();
                    this.dialogNode.set('title', this.title);
                    this.formNode.watch('state', lang.hitch(this, 'stateChange'));
                    on(this.okButtonNode, 'Click', lang.hitch(this, 'hide'));
                    this.dialogNode.show();
                    this.stateChange();
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
    }
);

