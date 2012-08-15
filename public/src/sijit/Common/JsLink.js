define([
    'dojo/_base/declare',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_OnDijitClickMixin',
    'dojo/text!./Template/JsLink.html'
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
        'sijit.Common.JsLink',
        [Widget, TemplatedMixin, OnDijitClickMixin],
        {
            templateString: template,
            onClick: function(){}
        }
    );
});
