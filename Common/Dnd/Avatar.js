define([
    'dojo/_base/declare',
	'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/dnd/Avatar'
],
function (
    declare,
    domConstruct,
    domClass,
    Avatar
){
    // module:
    //		Sds/Common/Sortable

    return declare(
        'Sds/Common/Dnd/Avatar',
        [Avatar],
        {
            construct: function(){

                var avatar = domConstruct.create('ul', {
                    'class': 'dojoDndAvatar',
                    style: {
                        position: 'absolute',
                        zIndex: '1999',
                        margin: '0px'
                    }
                });
                var source = this.manager.source;
                var node;

                for(var i = 0, k = Math.min(5, this.manager.nodes.length); i < k; ++i){
                    if(source.creator){
                        // create an avatar representation of the node
                        node = source._normalizedCreator(source.getItem(this.manager.nodes[i].id).data, "avatar").node;
                    }else{
                        // or just clone the node and hope it works
                        node = this.manager.nodes[i].cloneNode(true);
                    }
                    domClass.add(node, 'dojoDndAvatarItem');
                    avatar.appendChild(node);
                }

                this.node = avatar;
            }
        }
    );
});
