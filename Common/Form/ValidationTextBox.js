define([
    'dojo/_base/declare',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/Common/Form/_TextBoxMixin',
    'Sds/Common/Form/_ValidationMixin',
    'Sds/Common/Form/_AppendageMixin',
    'dojo/text!./Template/ValidationTextBox.html',
    'Sds/Common/Form/ValidationMessage'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    TextBoxMixin,
    ValidationMixin,
    AppendageMixin,
    template
){
    return declare(
        'Sds/Common/Form/ValidationTextBox',
        [Widget, TemplatedMixin, WidgetsInTemplateMixin, TextBoxMixin, AppendageMixin, ValidationMixin],
        {
            templateString: template,

            // message: String
            //		Current error/prompt message.
            message: '',

            messagePosition: 'auto',
            
            postCreate: function(){
                this._messageStyleNode = this.domNode;
                this.inherited(arguments);
            }
        }
    );
});
