define([
    'dojo/_base/declare',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_OnDijitClickMixin',
    'dojo/Evented',
    'dojo/text!./Template/TypeaheadItem.html'
    ],
    function (
        declare,
        Widget,
        TemplatedMixin,
        OnDijitClickMixin,
        Evented,
        template
        ){
        // module:
        //		Sds/Common/TypeaheadItem

        return declare(
            'Sds/Common/TypeaheadItem',
            [Widget, TemplatedMixin, OnDijitClickMixin, Evented],
            {
                templateString: template,
                label: null,
                
                onClick: function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    this.emit('clicked',this);
                }
            }
            );
    });