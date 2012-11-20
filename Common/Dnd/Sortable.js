define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'Sds/Common/Dnd/Moveable',
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/dom-geometry',
    'dojo/dom-class',
    'dijit/_Widget'
],
function (
    declare,
    lang,
    array,
    Moveable,
    domConstruct,
    domAttr,
    domGeom,
    domClass,
    Widget
){
    // module:
    //		Sds/Common/Dnd/Sortable

    return declare(
        'Sds/Common/Dnd/Sortable',
        [Widget],
        {

            dummyItem: undefined,

            buildRendering: function(){
                this.inherited(arguments);

                // Add movers
                array.forEach(this.srcNodeRef.children, lang.hitch(this, function(node){
                    var moveable = new Moveable(node);
                    moveable.on('firstMove', lang.hitch(this, 'onMoveableFirstMove'));
                    moveable.on('moveStop', lang.hitch(this, 'onMoveableStop'));
                    moveable.on('moved', lang.hitch(this, 'onMoveableMoved'));
                    domClass.add(moveable.node, 'dojoDndItem');
                }))
            },

            onMoveableFirstMove: function(mover){

                //Create the dummy item
                this.dummyItem = lang.clone(mover.node);
                domClass.remove(this.dummyItem, 'dojoMoveItem');
                domClass.add(this.dummyItem, 'dojoDndDummyItem');
                domAttr.remove(this.dummyItem, 'style');
                if (mover.node.previousElementSibling){
                    domConstruct.place(this.dummyItem, mover.node.previousElementSibling, 'after');
                } else {
                    domConstruct.place(this.dummyItem, mover.node.nextElementSibling, 'before');
                }
            },

            onMoveableStop: function(mover){
                //Replace the dummy item with the one that has been dragged
                domAttr.remove(mover.node, 'style');
                domConstruct.place(mover.node, this.dummyItem, 'replace');
            },

            onMoveableMoved: function(e){
                //Make the dummy item track the item being dragged
                var insertY = e.leftTop.t + e.mover.node.offsetHeight / 2;
                var position, refNode;

                array.forEach(this.domNode.children, function(node){
                    if ( ! refNode && node !== e.mover.node){
                        position = domGeom.position(node);
                        if (insertY < position.y + position.h / 2){
                            refNode = node;
                        }
                    }
                });
                if (refNode){
                    if(refNode !== this.dummyItem){
                        domConstruct.place(this.dummyItem, refNode, 'before');
                    }
                } else {
                    refNode = this.domNode.lastElementChild;
                    if (refNode !== this.dummyItem){
                        domConstruct.place(this.dummyItem, refNode, 'after');
                    }
                }
            }
        }
    );
});
