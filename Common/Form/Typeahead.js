define([
    'dojo/_base/declare',
    'Sds/Common/Form/TextBox',
    'Sds/Common/Form/_TypeaheadMixin',    
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
        'Sds/Common/Form/Typeahead',
        [TextBox, TypeaheadMixin],
        {            
            templateString: template            
        }
    );
});
