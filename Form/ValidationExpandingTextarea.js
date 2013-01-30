define([
    'dojo/_base/declare',
    'dijit/form/_ExpandingTextAreaMixin',
    'Sds/Form/ValidationTextarea'
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
