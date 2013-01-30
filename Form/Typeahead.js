define([
    'dojo/_base/declare',
    'Sds/Form/TextBox',
    'Sds/Form/_TypeaheadMixin',
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
        'Sds/Form/Typeahead',
        [TextBox, TypeaheadMixin],
        {
            templateString: template
        }
    );
});
