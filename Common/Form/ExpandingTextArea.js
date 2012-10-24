define([
    'dojo/_base/declare',
    'dijit/form/_ExpandingTextAreaMixin',
    'Sds/Common/Form/Textarea'
],
function (
    declare,
    ExpandingTextAreaMixin,
    Textarea
){
    return declare(
        'Sds/Common/Form/ExpandingTextArea',
        [Textarea, ExpandingTextAreaMixin],
        {
        }
    );
});
