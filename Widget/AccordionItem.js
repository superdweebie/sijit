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

            bodyHeight: 300,

            click: function(e){
                e.preventDefault();
                this.set('hidden', false);
            },

            _setHiddenAttr: function(value){
                if (value){
                    fx.animateProperty({
                        node: this.accordionBody,
                        properties: {
                            height: 0
                        }
                    }).play();
                } else {
                    fx.animateProperty({
                        node: this.accordionBody,
                        properties: {
                            height: this.bodyHeight
                        }
                    }).play();
                }
                this._set('hidden', !!value);
            }
        }
    );
});