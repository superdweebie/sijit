define([
    'dojo/_base/declare',
    'dijit/form/_ExpandingTextAreaMixin',
    './ValidationTextarea'
],
function (
    declare,
    ExpandingTextAreaMixin,
    ValidationTextarea
){
    return declare(
        [ValidationTextarea, ExpandingTextAreaMixin],
        {
        }
    );
});
