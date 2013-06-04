define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    './_FormMixin',
    './_ValidationMixin',
    './_ValidationMessagesMixin',
    'dojo/text!./Template/ValidationControlGroup.html',
    '../Widget/Alert'
],
function (
    declare,
    lang,
    array,
    Widget,
    TemplatedMixin,
    FormMixin,
    ValidationMixin,
    ValidationMessagesMixin,
    WidgetsInTemplateMixin,
    template
){
    return declare(
        [Widget, TemplatedMixin, WidgetsInTemplateMixin, FormMixin, ValidationMixin, ValidationMessagesMixin],
        {
            templateString: template,

            validationStyle: {
                preActivity: {
                    //valid: [], //A list of classes to apply when valid
                    //invalid: [] //apply when invalid
                },
                postActivity: {
                    //valid: [], //apply when valid
                    invalid: ['alert-error'] //apply when invalid
                }
            },

            startup: function(){
                this.inherited(arguments);

                array.forEach(this._getDescendantFormWidgets(), lang.hitch(this, function(child){
                    child.watch('postActivity', lang.hitch(this, '_childPostActivityWatcher'));
                }));

                this.on('messages-updated', lang.hitch(this, '_updateAlert'));
            },

            _updateAlert: function(e){
                if (e.objects.length > 0){
                    this.alert.show();
                } else {
                    this.alert.hide();
                }
            },

            _childPostActivityWatcher: function(property, oldValue, newValue){
                if (newValue){
                    this.set('postActivity', true);
                }
            },

            _getInvalidWidgetsAttr: function(){
                var result = this.inherited(arguments);
                if (this.get('state') != ''){
                    result.push(this);
                }
                return result;
            }
        }
    );
});
