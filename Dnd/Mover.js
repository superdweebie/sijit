define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/_base/event',
    'dojo/dom',
    'dojo/dom-geometry',
    'dojo/dom-style',
    'dojo/dom-class',
    'dojo/_base/window',
    'dojo/on',
    'dojo/touch',
    'dojo/dnd/autoscroll',
    'dijit/_WidgetBase'
],
        function(
                declare,
                lang,
                array,
                event,
                dom,
                domGeom,
                domStyle,
                domClass,
                win,
                on,
                touch,
                autoscroll,
                WidgetBase
                ) {
            // module:
            //		Sds/Dnd/Mover

            return declare(
                    'Sds/Dnd/Mover',
                    [WidgetBase],
                    {
                        events: [],
                        offset: {top: 0, left: 0},
                        constructor: function(node) {
                            this.node = node;

                            var d = node.ownerDocument;
                            this.events = [
                                on(d, touch.move, lang.hitch(this, "onFirstMove")),
                                on(d, touch.move, lang.hitch(this, "onMouseMove")),
                                on(d, touch.release, lang.hitch(this, "onMouseUp")),
                            ];
                            autoscroll.autoScrollStart(d);
                        },
                        onFirstMove: function(e) {
                            event.stop(e);
                            var node = this.get('node');
                            var position = domStyle.get(node, 'position');

                            if (position == 'absolute' || position == 'relative') {

                            } else {
                                domStyle.set(node, {
                                    position: 'absolute'
                                });
                                var m = domGeom.getMarginBox(node);
                                
                                var parent = this.getAbsoluteParent(node);
                                console.log(parent);
//                                var nS = domStyle.getComputedStyle(n);
//                                var nM = domGeom.getMarginBox(n, nS);
//                                var nC = domGeom.getContentBox(n, nS);
//
//                                console.log(nM);
                            }

                            this.events.shift().remove();
                        },
                        onMouseMove: function(e) {
//                            var node = this.get('node');
//                            domStyle.set(node, {
//                                top: e.pageY + 'px',
//                                left: e.pageX + 'px'
//                            });
//                            domClass.add(node, 'dojoDndMoveItem');
//                            event.stop(e);
                        },
                        onMouseUp: function(e) {
                            event.stop(e);

                            var node = this.get('node');
                            domClass.remove(node, 'dojoDndMoveItem');

                            this.destroy();
                        },
                        destroy: function() {
                            array.forEach(this.events, function(e) {
                                e.remove();
                            });
                            // destroy objects
                            this.events = this.node = null;
                        },
                                
                        getAbsoluteParent: function(node) {
                            if (node.parentNode) {
                                var position = domStyle.get(node, 'position');
                                if (position == 'absolute' || position == 'relative') {
                                    return node.parentNode;
                                } else {
                                    return this.getAbsoluteParent(node.parentNode);
                                }
                            } else {
                                return win.doc.body;
                            }
                        }
                    }

            );
        });
