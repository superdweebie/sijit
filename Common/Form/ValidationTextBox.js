define([
    'dojo/_base/declare',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'Sds/Common/Form/_TextBoxMixin',
    'Sds/Common/Form/_ValidationMixin',
    'Sds/Common/Form/_AppendageMixin',
    'Sds/Common/Form/_ValidationMessagesMixin',
    'dojo/text!./Template/ValidationTextBox.html'
],
function (
    declare,
    Widget,
    TemplatedMixin,   
    TextBoxMixin,
    ValidationMixin,
    AppendageMixin,
    ValidationMessagesMixin,
    template
){
    return declare(
        'Sds/Common/Form/ValidationTextBox',
        [Widget, TemplatedMixin, TextBoxMixin, AppendageMixin, ValidationMixin, ValidationMessagesMixin],
        {
            templateString: template      
        }
    );
});
