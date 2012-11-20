define([
    'dojo/_base/declare',
    'dojo/dnd/Moveable'
],
function (
    declare,
    Moveable
){
    // module:
    //		Sds/Common/Dnd/Moveable

    return declare(
        'Sds/Common/Dnd/Moveable',
        [Moveable],
        {
            delay: 80,

            // markup methods
            markupFactory: function(params, node, Ctor){
                //this is required because dojo/dnd/Moveable predates some of dojo's widget infastructure
                return new Ctor(node, params);
            },

            onFirstMove: function(mover, e){
                //Add event emission (much nicer than publishing topics)
                this.inherited(arguments);
                this.emit('firstMove', mover);
            },

            onMoveStop: function(/*Mover*/ mover){
                //Add event emission (much nicer than publishing topics)
                this.inherited(arguments);
                this.emit('moveStop', mover);
            },

            onMoved: function(mover, leftTop){
                //Add event emission (much nicer than publishing topics)
                this.emit('moved', {mover: mover, leftTop: leftTop});
            }
        }
    );
});
