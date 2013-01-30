define([
    'dojo/_base/declare',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'Sds/Form/_TextBoxMixin',
    'Sds/Form/_AppendageMixin',
    'dojo/text!./Template/TextBox.html'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    TextBoxMixin,
    AppendageMixin,
    template
){
    return declare(
        'Sds/Form/TextBox',
        [Widget, TemplatedMixin, TextBoxMixin, AppendageMixin],
        {
            templateString: template
        }
    );
});
