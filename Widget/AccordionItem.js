define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dojo/_base/fx',
    'dojo/on',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/text!./Template/AccordionItem.html'
],
function(
    declare,
    lang,
    domClass,
    fx,
    on,
    Widget,
    TemplatedMixin,
    template
){
    // module:
    //		Sds/Widget/AccordionItem

    return declare
    (
        [Widget, TemplatedMixin],
        {
            // summary:
            //		A widget to populate Sds/Widget/Accordion

            //accordion: undefined,

            //title: undefined,

            templateString: template,

            //selectedBodyHeight: undefined,

            click: function(e){
                e.preventDefault();
                this.set('hidden', false);
            },

            _setHiddenAttr: function(value){
                if (value){
                    fx.animateProperty({
                        node: this.body,
                        properties: {
                            height: 0
                        }
                    }).play();
                } else {
                    fx.animateProperty({
                        node: this.body,
                        properties: {
                            height: this.selectedBodyHeight
                        }
                    }).play();
                }
                this._set('hidden', !!value);
            }
        }
    );
});