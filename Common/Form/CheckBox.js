define([
    'dojo/_base/declare',
    'dijit/form/CheckBox',
    'dojo/text!./Template/CheckBox.html'
],
function(
    declare,
    CheckBox,
    template
){
    // module:
    //		Sds/Common/Form/CheckBox

    return declare
    (
        'Sds/Common/Form/CheckBox',
        [CheckBox],
        {
            // summary:
            //		An widget similar to dijit/Form/CheckBox, but using twitter/bootstrap styling

            templateString: template
        }
    );
});
