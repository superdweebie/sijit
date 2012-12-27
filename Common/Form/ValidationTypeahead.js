define([
    'dojo/_base/declare',
    'Sds/Common/Form/ValidationTextBox',
    'Sds/Common/Form/_TypeaheadMixin',    
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
        'Sds/Common/Form/ValidationTypeahead',
        [ValidationTextBox, TypeaheadMixin],
        {            
            templateString: template            
        }
    );
});
