define([
    'dojo/_base/declare',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_OnDijitClickMixin',
    'dojo/text!./Template/Button.html'
],
function(
    declare,
    Widget,
    TemplatedMixin,
    OnDijitClickMixin,
    template
){
    // module:
    //		Sds/Widget/Button

    return declare
    (
        [Widget, TemplatedMixin, OnDijitClickMixin],
        {
            // summary:
            //		An widget similar to dijit/Button, but using twitter/bootstrap styling

            templateString: template,

            onClick: function(){}
        }
    );
});
