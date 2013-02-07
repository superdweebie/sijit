define([
    'dojo/_base/declare',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    './_TextBoxMixin',
    'dijit/_WidgetsInTemplateMixin',
    './_ValidationMixin',
    './_ValidationMessagesMixin',
    'dojo/text!./Template/ValidationTextarea.html'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    TextBoxMixin,
    WidgetsInTemplateMixin,
    ValidationMixin,
    ValidationMessagesMixin,
    template
){
    return declare(
        'Sds/Form/ValidationTextarea',
        [Widget, TemplatedMixin, WidgetsInTemplateMixin, TextBoxMixin, ValidationMixin, ValidationMessagesMixin],
        {
            templateString: template,

            postCreate: function(){
                this.set('value', this.textbox.value);
                this.inherited(arguments);
            }
        }
    );
});
