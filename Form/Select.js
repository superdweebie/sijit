define([
    'dojo/_base/declare',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    './_SelectMixin',
    './_RequiredStarMixin',   
    'dojo/text!./Template/Select.html'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    SelectMixin,
    RequiredStarMixin,
    template
){
    return declare(
        [Widget, TemplatedMixin, SelectMixin, RequiredStarMixin],
        {
            templateString: template
        }
    );
});
