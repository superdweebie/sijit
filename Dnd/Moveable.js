define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/_base/event',
    'dojo/dom',
    'dojo/on',
    'dojo/touch',
    'Sds/Dnd/Mover',
    'dijit/_WidgetBase',
    'dojo/Evented'
],
        function(
                declare,
                lang,
                array,
                event,
                dom,
                on,
                touch,
                Mover,
                WidgetBase,
                Evented
                ) {
            // module:
            //		Sds/Dnd/Moveable

            return declare(
                    [WidgetBase, Evented],
                    {
                        delay: 80,
                        node: undefined,
                        constructor: function(node, params) {
                            lang.hitch(this, params);

                            this.node = dom.byId(node);

                            if (!this.handle) {
                                this.handle = this.node;
                            }

                            this.events = [
                                on(this.handle, touch.press, lang.hitch(this, "onMouseDown")),
                                on(this.handle, "dragstart", lang.hitch(this, "onSelectStart")),
                                on(this.handle, "selectstart", lang.hitch(this, "onSelectStart"))
                            ];
                        },
                        onSelectStart: function(e) {
                            event.stop(e);
                        },
                        onMouseDown: function(e) {
                            event.stop(e);
                            this.events.push(on(this.handle, touch.move, lang.hitch(this, "onMouseMove")));
                            this.events.push(on(this.handle, touch.release, lang.hitch(this, "onMouseUp")));
                        },
                        onMouseMove: function(e) {
                            event.stop(e);
                            this.onMouseUp(e);
                            this.onDragDetected(e);
                        },
                        onDragDetected: function(e) {
                            var mover = new Mover(this.get('node'));

                            event.stop(e);
                        },
                        onMouseUp: function(e) {
                            for (var i = 0; i < 2; i++) {
                                this.events.pop().remove();
                            }
                            event.stop(e);
                        },
                        onFirstMove: function(mover, e) {
                            this.inherited(arguments);
                            this.emit('firstMove', mover);
                        },
                        onMoveStop: function(/*Mover*/mover) {
                            this.inherited(arguments);
                            this.emit('moveStop', mover);
                        },
                        onMoved: function(mover, leftTop) {
                            this.emit('moved', {mover: mover, leftTop: leftTop});
                        },
                        destroy: function() {
                            array.forEach(this.events, function(handle) {
                                handle.remove();
                            });
                            this.events = this.node = this.handle = null;
                        }
                    }
            );
        });
