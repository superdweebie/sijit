define([
    'dojo/_base/declare',
    'dojo/dom-geometry',
    'dojo/dnd/Source',
    'dojo/dnd/Manager',
    'dojo/dom-class',
    'Sds/Common/Dnd/Avatar'
],
function (
    declare,
    domGeom,
    Source,
    Manager,
    domClass,
    Avatar
){
    // module:
    //		Sds/Common/Sortable

    return declare(
        'Sds/Common/Sortable',
        [Source],
        {
            manager: undefined,

            constructor: function(){
                var manager = this.manager = Manager.manager();
                manager.makeAvatar = function(){
                    return new Avatar(manager);
                }
            },

            onMouseMove: function(e){

                if(this.isDragging){
                    var position = domGeom.position(this.node, false);

                    if (e.pageX >= position.x &&
                        e.pageX <= position.x + position.w &&
                        e.pageY >= position.y &&
                        e.pageY <= position.y + position.h
                    ){
                        //The mouse is inside the source container node. Now check
                        //each child node

                        for(var i in this.node.children){
                            var node = this.node.children[i];
                            position = domGeom.position(node, false);
                            if (e.pageX >= position.x &&
                                e.pageX <= position.x + position.w &&
                                e.pageY >= position.y &&
                                e.pageY <= position.y + position.h
                            ){
                                if(this.current != node){
                                    if(this.current){
                                        this._removeItemClass(this.current, "Over");
                                    }
                                    if(node){
                                        this._addItemClass(node, "Over");
                                    }
                                    this.current = node;
                                }
                                break;
                            }
                        }
                    }
                }

                this.inherited(arguments);
            },

            onMouseDown: function(e){
                this.manager.OFFSET_X = e.target.offsetLeft - e.pageX;
                this.manager.OFFSET_Y = e.target.offsetTop - e.pageY;
                this.inherited(arguments);
            }
        }
    );
});
