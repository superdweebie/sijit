define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/query',
    'Sds/Dnd/Moveable',
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/dom-class',
    'dojo/Evented',
    'dijit/_WidgetBase'
],
function (
    declare,
    lang,
    array,
    query,
    Moveable,
    domConstruct,
    domAttr,
    domClass,
    Evented,
    WidgetBase
){
    // module:
    //		Sds/Dnd/Sortable

    return declare(
        [WidgetBase, Evented],
        {

            //dummyItem: undefined,

            buildRendering: function(){

                if(!this.domNode){
                    // Create root node if it wasn't created by _Templated
                    this.domNode = this.srcNodeRef || this.ownerDocument.createElement("ul");
                }

                this.containerNode = this.domNode;

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

            addChild: function(/*DomNode|dijit/_WidgetBase*/ child, /*Integer?*/ insertIndex, /*Object*/ options){
                var node;

                if (child.isInstanceOf && child.isInstanceOf(WidgetBase)){
                    node = domConstruct.create('li');
                    node.appendChild(child.domNode);
                } else {
                    node = child;
                }

                //look for handle class in node
                var handle = query('.dojoDndItemHandle', node);
                //use first instance for handle
                if(handle[0]) {
                    if(typeof(options) == 'object') {
                        lang.mixin(options, {handle: handle[0]});
                    } else {
                        options = {handle: handle[0]};
                    }
                }

                if(typeof(options) == 'object') {
                    var moveable = new Moveable(node, options);
                } else {
                    var moveable = new Moveable(node);
                }

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
                switch (true){
                    case mover.node.previousElementSibling:
                        domConstruct.place(this.dummyItem, mover.node.previousElementSibling, 'after');
                        break;
                    case mover.node.nextElementSibling:
                        domConstruct.place(this.dummyItem, mover.node.nextElementSibling, 'before');
                        break;
                    default:
                        domConstruct.place(this.dummyItem, mover.node, 'before');
                }

                this.emit('firstMove', mover);
            },

            onMoveableStop: function(mover){

                if ( ! this.dummyItem){
                    //No dummy item created, means that no actual mode happend - move stop triggered by mouseup
                    return;
                }

                var index=0, i=0, prevNode=undefined;

                //Replace the dummy item with the one that has been dragged
                domAttr.remove(mover.node, 'style');
                domConstruct.place(mover.node, this.dummyItem, 'replace');

                array.forEach(this.domNode.children, function(node){
                    if (node === mover.node){
                        index = i;
                    }
                    i++;
                });
                if(index!=0) {
                    prevNode=this.domNode.children[index-1];
                }
                this.dummyItem = undefined;
                this.emit('moveStop', mover, prevNode);
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
