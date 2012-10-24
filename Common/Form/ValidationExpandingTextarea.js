define([
    'dojo/_base/declare',
    'dijit/form/_ExpandingTextAreaMixin',
    'Sds/Common/Form/ValidationTextarea'
],
function (
    declare,
    ExpandingTextAreaMixin,
    ValidationTextarea
){
    return declare(
        'Sds/Common/Form/ValidationExpandingTextarea',
        [ValidationTextarea, ExpandingTextAreaMixin],
        {
        }
    );
});
