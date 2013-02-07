define([
    'dojo/_base/declare',
    'dijit/form/_ExpandingTextAreaMixin',
    './Textarea'
],
function (
    declare,
    ExpandingTextAreaMixin,
    Textarea
){
    return declare(
        'Sds/Form/ExpandingTextArea',
        [Textarea, ExpandingTextAreaMixin],
        {
        }
    );
});
