define([
    'dojo/_base/declare',
    './TextBox',
    './_TypeaheadMixin',
    'dojo/text!./Template/TextBox.html'
],
function (
    declare,
    TextBox,
    TypeaheadMixin,
    template
){
    // module:
    //		Sds/Form/Typeahead

    return declare(
        [TextBox, TypeaheadMixin],
        {
            templateString: template
        }
    );
});
