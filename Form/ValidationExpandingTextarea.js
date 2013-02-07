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
        'Sds/Form/ValidationExpandingTextarea',
        [ValidationTextarea, ExpandingTextAreaMixin],
        {
        }
    );
});
