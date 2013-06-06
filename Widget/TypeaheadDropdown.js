define([
    'dojo/_base/declare',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    './_DropdownBaseMixin',
    'dojo/text!./Template/Dropdown.html'
],
function (
    declare,
    Widget,
    TemplatedMixin,
    DropdownBaseMixin,
    template
){
    // module:
    //    	Sds/Widget/Dropdown

    return declare(
        [Widget, TemplatedMixin, DropdownBaseMixin],
        {
            templateString: template
        }
    );
});
