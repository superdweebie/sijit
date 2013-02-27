define([
    'dojo/_base/declare',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    './_ToggleMixin',
    'dojo/text!./Template/Toggle.html'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    ToggleMixin,
    template
){
    return declare(
        [Widget, TemplatedMixin, ToggleMixin],
        {
            templateString: template
        }
    );
});
