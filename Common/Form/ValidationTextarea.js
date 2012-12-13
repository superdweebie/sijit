define([
    'dojo/_base/declare',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',    
    'Sds/Common/Form/_TextBoxMixin',
    'Sds/Common/Form/_ValidationMixin',
    'dojo/text!./Template/ValidationTextarea.html',
    'Sds/Common/Form/ValidationMessage'    
],
function (
    declare,
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    TextBoxMixin,
    ValidationMixin,
    template    
){
    return declare(
        'Sds/Common/Form/ValidationTextarea',
        [Widget, TemplatedMixin, WidgetsInTemplateMixin, TextBoxMixin, ValidationMixin],
        {
            templateString: template,

            // message: String
            //		Current error/prompt message.
            message: '',

            messagePosition: 'auto',
            
            postCreate: function(){
                this.set('value', this.textbox.value);
                this.inherited(arguments);
            }
        }
    );
});
