define([
    'dojo/_base/declare',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'Sds/Form/_TextBoxMixin',
    'Sds/Form/_ValidationMixin',
    'Sds/Form/_AppendageMixin',
    'Sds/Form/_ValidationMessagesMixin',
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
        'Sds/Form/ValidationTextBox',
        [Widget, TemplatedMixin, TextBoxMixin, AppendageMixin, ValidationMixin, ValidationMessagesMixin],
        {
            templateString: template
        }
    );
});
