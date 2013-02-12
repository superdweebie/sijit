define([
    'dojo/_base/declare',
    './TextBox',
    './_TypeaheadMixin',
    'dojo/text!./Template/Typeahead.html'
],
function (
    declare,
    TextBox,
    TypeaheadMixin,
    template
){
    // module:
    //		Sds/Common/Typeahead

    return declare(
        [TextBox, TypeaheadMixin],
        {
            templateString: template
        }
    );
});
