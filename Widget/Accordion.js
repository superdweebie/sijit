define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/dom-geometry',
    'dijit/registry',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/text!./Template/Accordion.html',
    './AccordionItem'
],
function (
    declare,
    array,
    lang,
    domGeom,
    registry,
    Widget,
    TemplatedMixin,
    template,
    AccordionItem
){
    // module:
    //    	Sds/Widget/Accordion

    return declare(
        [Widget, TemplatedMixin],
        {
            templateString: template,

            //items: [],

            startup: function(){
                this.inherited(arguments);

                this.items = [];
                var item;

                array.forEach(this.containerNode.childNodes, lang.hitch(this, function(node){
                    if (node.nodeType == 1){
                        item = registry.byNode(node);
                        if (item && item.isInstanceOf && item.isInstanceOf(AccordionItem)){
                            this.addItem(item, true);
                        }
                    }
                }));

                if (this.items.length > 0){
                    this.items[0].set('hidden', false);
                }
            },

            addItem: function(item, inStartup){

                this.items.push(item);

                if ( ! inStartup){
                    this.containerNode.appendChild(item.domNode);
                }

                //adjust AccordionItem boby height.
                var selectedBodyHeight = domGeom.getContentBox(this.domNode).h;
                array.forEach(this.items, function(item){
                    selectedBodyHeight -= domGeom.getMarginBox(item.heading).h;
                });
                array.forEach(this.items, function(item){
                    item.set('selectedBodyHeight', selectedBodyHeight);
                });

                var self = this;
                item.watch('hidden', lang.hitch(item, function(property, oldValue, newValue){
                    if ( ! newValue){
                        array.forEach(self.items, lang.hitch(this, function(innerItem){
                            if (innerItem !== this){
                                innerItem.set('hidden', true);
                            }
                        }))
                    }
                }))
            }
        }
    );
});
