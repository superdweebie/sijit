define([
    'dojo/_base/declare',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    '../Widget/_WidgetsInTemplateMixin',
    './_DropdownMixin',
    'dojo/text!./Template/Dropdown.html',
    '../Widget/Dropdown'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    DropdownMixin,
    template
){
    return declare(
        [Widget, TemplatedMixin, WidgetsInTemplateMixin, DropdownMixin],
        {
            templateString: template
        }
    );
});
