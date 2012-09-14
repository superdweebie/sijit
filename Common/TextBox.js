define([
    'dojo/_base/declare',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'dijit/Form/_FormValueMixin',
    'dojo/text!./Template/TextBox.html'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    FormValueMixin,
    template
){
    return declare(
        'Sds/Common/TextBox',
        [Widget, TemplatedMixin, FormValueMixin],
        {
            templateString: template
        }
    );
});
