define([
    'dojo/_base/declare',
    'Sds/Form/ValidationTextBox',
    'Sds/Form/_TypeaheadMixin',
    'dojo/text!./Template/Typeahead.html'
],
function (
    declare,
    ValidationTextBox,
    TypeaheadMixin,
    template
){
    // module:
    //		Sds/Common/ValidationTypeahead

    return declare(
        'Sds/Form/ValidationTypeahead',
        [ValidationTextBox, TypeaheadMixin],
        {
            templateString: template
        }
    );
});
