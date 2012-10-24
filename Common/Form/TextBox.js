define([
    'dojo/_base/declare',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'Sds/Common/Form/_TextBoxMixin',
    'Sds/Common/Form/_AppendageMixin',
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
        'Sds/Common/Form/TextBox',
        [Widget, TemplatedMixin, TextBoxMixin, AppendageMixin],
        {
            templateString: template
        }
    );
});
