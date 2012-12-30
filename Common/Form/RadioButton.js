define([
    'dojo/_base/declare',
    'dijit/form/RadioButton',
    'dojo/text!./Template/RadioButton.html'
],
function(
    declare,
    RadioButton,
    template
){
    // module:
    //		Sds/Common/Form/RadioButton

    return declare
    (
        'Sds/Common/Form/RadioButton',
        [RadioButton],
        {
            // summary:
            //		An widget similar to dijit/Form/RadioButton, but using twitter/bootstrap styling

            templateString: template,
            
            _onClick: function(e) {
                this.set('checked', e.target.checked);
            }
        }
    );
});
