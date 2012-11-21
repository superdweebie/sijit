define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'Sds/Common/Dnd/Moveable',
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/dom-class',
    'dijit/_WidgetBase'
],
function (
    declare,
    lang,
    array,
    Moveable,
    domConstruct,
    domAttr,
    domClass,
    WidgetBase
){
    // module:
    //		Sds/Common/Dnd/Sortable

    return declare(
        'Sds/Common/Dnd/Sortable',
        [WidgetBase],
        {

            dummyItem: undefined,

            buildRendering: function(){

                if(!this.domNode){
                    // Create root node if it wasn't created by _Templated
                    this.domNode = this.srcNodeRef || this.ownerDocument.createElement("ul");
                }

                this.inherited(arguments);

                // Add movers
                if (this.srcNodeRef){
                    array.forEach(this.srcNodeRef.children, lang.hitch(this, function(node){
                        var moveable = new Moveable(node);
                        moveable.on('firstMove', lang.hitch(this, 'onMoveableFirstMove'));
                        moveable.on('moveStop', lang.hitch(this, 'onMoveableStop'));
                        moveable.on('moved', lang.hitch(this, 'onMoveableMoved'));
                        domClass.add(moveable.node, 'dojoDndItem');
                    }))
                }
            },

            addChild: function(/*DomNode|dijit/_WidgetBase*/ child, /*Integer?*/ insertIndex){

                var node;
                if (child.isInstanceOf && child.isInstanceOf(WidgetBase)){
                    node = domConstruct.create('li');
                    node.appendChild(child.domNode);
                } else {
                    node = child;
                }

                var moveable = new Moveable(node);
                moveable.on('firstMove', lang.hitch(this, 'onMoveableFirstMove'));
                moveable.on('moveStop', lang.hitch(this, 'onMoveableStop'));
                moveable.on('moved', lang.hitch(this, 'onMoveableMoved'));
                domClass.add(moveable.node, 'dojoDndItem');
                domConstruct.place(node, this.domNode, insertIndex);
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
                var refNode;
                var insertY = e.leftTop.t + e.mover.node.offsetHeight / 2;


                array.forEach(this.domNode.children, function(node){
                    if ( ! refNode && node !== e.mover.node){
                        if (insertY < node.offsetTop + node.offsetHeight / 2){
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
