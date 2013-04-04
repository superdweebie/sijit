define([
    'dojo/_base/declare',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    './_DropdownMixin',
    'dojo/text!./Template/Dropdown.html'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    DropdownMixin,
    template
){
    return declare(
        [Widget, TemplatedMixin, DropdownMixin],
        {
            templateString: template
        }
    );
});
