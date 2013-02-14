define([
    'dojo/_base/declare',
    './ValidationTextBox',
    './_TypeaheadMixin',
    'dojo/text!./Template/Typeahead.html'
],
function (
    declare,
    ValidationTextBox,
    TypeaheadMixin,
    template
){
    // module:
    //		Sds/Form/ValidationTypeahead

    return declare(
        [ValidationTextBox, TypeaheadMixin],
        {
            templateString: template
        }
    );
});
