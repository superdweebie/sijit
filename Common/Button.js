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
    return declare
    (
        'Sds/Common/Button',
        [Widget, TemplatedMixin, OnDijitClickMixin],
        {
            templateString: template,
            onClick: function(){}
        }
    );
});
