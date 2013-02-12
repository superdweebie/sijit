define([
    'dojo/_base/declare',
    'dojo/dnd/Moveable'
],
function (
    declare,
    Moveable
){
    // module:
    //		Sds/Dnd/Moveable

    return declare(
        [Moveable],
        {
            delay: 80,

            // markup methods
            markupFactory: function(params, node, Ctor){
                //this is required because dojo/dnd/Moveable predates some of dojo's widget infastructure
                return new Ctor(node, params);
            },

            onFirstMove: function(mover, e){
                //An event emission (much nicer than publishing topics)
                this.inherited(arguments);
                this.emit('firstMove', mover);
            },

            onMoveStop: function(/*Mover*/ mover){
                //An event emission (much nicer than publishing topics)
                this.inherited(arguments);
                this.emit('moveStop', mover);
            },

            onMoved: function(mover, leftTop){
                //An event emission (much nicer than publishing topics)
                this.emit('moved', {mover: mover, leftTop: leftTop});
            }
        }
    );
});
