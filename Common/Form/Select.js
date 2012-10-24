define([
    'dojo/_base/declare',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'Sds/Common/Form/_SelectMixin',
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
        'Sds/Common/Form/Select',
        [Widget, TemplatedMixin, SelectMixin],
        {
            templateString: template
        }
    );
});
