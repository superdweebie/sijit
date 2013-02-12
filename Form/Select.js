define([
    'dojo/_base/declare',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    './_SelectMixin',
    'dojo/text!./Template/Select.html'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    SelectMixin,
    template
){
    return declare(
        [Widget, TemplatedMixin, SelectMixin],
        {
            templateString: template
        }
    );
});
