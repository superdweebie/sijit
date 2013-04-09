define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/event',
    'dojox/mobile/parser',
    'dojo/keys',
    'dojo/dom-construct',
    'dojo/dom-style',
    'dojo/dom-class',
    'dojo/dom-geometry',
    'bootstrap/Popover',
    'dijit/focus',
    '../Dnd/Moveable',
    'dojox/color/_base',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/form/_FormValueMixin',
    './_LabelMixin',
    './_HelpMessagesMixin',
    'dojo/text!./Template/ColorPicker.html',
    'dojo/text!./Template/ColorPickerPopover.html',
    '../Form/HexColor'
],
function (
    declare,
    lang,
    event,
    parser,
    keys,
    domConstruct,
    domStyle,
    domClass,
    domGeom,
    Popover,
    focus,
    Moveable,
    color,
    Widget,
    TemplatedMixin,
    FormValueMixin,
    LabelMixin,
    HelpMessagesMixin,
    template,
    popoverTemplate
){
    return declare(
        [Widget, TemplatedMixin, FormValueMixin, LabelMixin, HelpMessagesMixin],
        {

            value: '#CCCCCC',

            placement: 'bottom',

            templateString: template,

            //color: undefined,

            //preEditValue: undefined,

            buildRendering: function(){

                this.inherited(arguments);

                this.set('value', this.value);

                this._popover = new Popover(this.button, {
                    content: this.value,
                    placement: this.placement
                });

                var self = this;

                //Override default popover template
                this._popover.tip = function(){
                    if ( ! this.tipNode){
                        //create new popover
                        var tipNode = domConstruct.toDom(popoverTemplate),
                            cw = (self._startupWidgets = parser.parse(tipNode)),
                            hexWatch;

                        //attach popover template widgets to this
                        self._attachTemplateNodes(cw, function(n,p){
                            return n[p];
                        });

                        //attach popover attach-points to this
                        self._attachTemplateNodes(tipNode, function(n,p){
                            return n.getAttribute(p);
                        });

                        //set up watch on textbox
                        self.hex.on('focus', function(){
                            hexWatch = self.hex.watch('state', function(property, oldValue, newValue){
                                if (newValue == ''){
                                    self.set('value', self.hex.get('value'));
                                }
                            });
                        });
                        self.hex.on('blur', function(){
                            hexWatch.unwatch();
                        });

                        this.tipNode = tipNode
                    }
                    return this.tipNode;
                }

                //Override setContnet to take a color hex
                this._popover.setContent = function () {
                    var tip = this.tip();
                    var content = this.getContent();
                    self.hex.set('value', content);
                    domClass.remove(tip, 'fade in top bottom left right');
                }

                //Override show to set up the hue and box handles
                this._popover.show = function(){
                    this.inherited('show', arguments);

                    var value = self.value,
                        huePosition = self.get('huePosition'),
                        boxPosition = self.get('boxPosition'),
                        dndHueHandle = new Moveable(self.hueHandle),
                        dndBoxHandle = new Moveable(self.boxHandle);

                    dndHueHandle.on('moveStop', function(mover){
                        //change value after hue drag
                        self.set(
                            'value',
                            {
                                h: 359 * (1 - (mover.node.offsetTop - huePosition.min) / (huePosition.h)),
                                s: self.color.s,
                                v: self.color.v
                            }
                        );
                    });
                    dndHueHandle.onMove = function(mover, leftTop){
                        //enforce hue drag boundaries
                        if (leftTop.t < huePosition.min){
                            leftTop.t = huePosition.min;
                        } else if (leftTop.t > huePosition.max){
                            leftTop.t = huePosition.max;
                        }
                        this.inherited('onMove', [mover, {l: huePosition.left, t: leftTop.t}]);
                    }

                    //create dnd pointer handle
                    dndBoxHandle.on('moveStop', function(mover){
                        //change value after pointer drag
                        self.set(
                            'value',
                            {
                                h: self.color.h,
                                s: 100 * ((mover.node.offsetLeft - boxPosition.minLeft) / boxPosition.w),
                                v: 100 * (1 - (mover.node.offsetTop - boxPosition.minTop) / boxPosition.h)
                            }
                        );
                    });
                    dndBoxHandle.onMove = function(mover, leftTop){
                        //enforce pointer drag boundaries
                        if (leftTop.t < boxPosition.minTop){
                            leftTop.t = boxPosition.minTop;
                        } else if (leftTop.t > boxPosition.maxTop){
                            leftTop.t = boxPosition.maxTop;
                        }
                        if (leftTop.l < boxPosition.minLeft){
                            leftTop.l = boxPosition.minLeft;
                        } else if (leftTop.l > boxPosition.maxLeft){
                            leftTop.l = boxPosition.maxLeft;
                        }
                        this.inherited('onMove', [mover, leftTop]);
                    }

                    self.set('value', value);
                    self.preEditValue = value;
                    focus.focus(self.boxHandle);
                }
            },

            onPopoverKey: function(e){
                switch(e.keyCode){
                    case keys.ESCAPE:
                        this.set('value', this.preEditValue);
                    case keys.ENTER:
                        event.stop(e);
                        this._popover.hide();
                }
            },

            onHueHandleClick: function(){
                focus.focus(this.hueHandle);
            },

            onBoxHandleClick: function(){
                focus.focus(this.boxHandle);
            },

            onHueHandleKey: function(e){
                var hsv = this.color;
                switch(e.keyCode){
                    case keys.UP_ARROW:
                        if (hsv.h < 359){++hsv.h}
                        break;
                    case keys.DOWN_ARROW:
                        if (hsv.h > 0){--hsv.h}
                        break;
                }
                this.set('value', hsv);
            },

            onBoxHandleKey: function(e){
                var hsv = this.color;
                switch(e.keyCode){
                    case keys.RIGHT_ARROW:
                        if (hsv.s < 100){++hsv.s}
                        break;
                    case keys.LEFT_ARROW:
                        if (hsv.s > 0){--hsv.s}
                        break;
                    case keys.UP_ARROW:
                        if (hsv.v < 100){++hsv.v}
                        break;
                    case keys.DOWN_ARROW:
                        if (hsv.v > 0){--hsv.v}
                        break;
                }
                this.set('value', hsv);
            },

            onHueClick: function(e){
                var huePosition = this.get('huePosition');
                this.set('value', {
                    h: 359 * (1 - (e.clientY - huePosition.y) / (huePosition.h)),
                    s: this.color.s,
                    v: this.color.v
                });
                focus.focus(this.hueHandle);
            },

            onBoxClick: function(e){
                var boxPosition = this.get('boxPosition');
                this.set('value', {
                    h: this.color.h,
                    s: 100 * ((e.clientX - boxPosition.x) / boxPosition.w),
                    v: 100 * (1 - (e.clientY - boxPosition.y) / boxPosition.h)
                });
                focus.focus(this.boxHandle);
            },

            _getBoxPositionAttr: function(){
                if ( ! this.boxPosition){
                    var pos = domGeom.position(this.box);
                    this.boxPosition = lang.mixin(pos, {
                        maxLeft: this.box.offsetLeft + pos.w - this.boxHandle.offsetWidth / 2,
                        minLeft: this.box.offsetLeft - this.boxHandle.offsetWidth / 2,
                        maxTop: this.box.offsetTop + pos.h - this.boxHandle.offsetHeight / 2,
                        minTop: this.box.offsetTop - this.boxHandle.offsetHeight / 2
                    })
                }
                return this.boxPosition;
            },

            _getHuePositionAttr: function(){
                if ( ! this.huePosition){
                    var pos = domGeom.position(this.hue);
                    this.huePosition = lang.mixin(pos, {
                        max: this.hue.offsetTop + pos.h - this.hueHandle.offsetHeight / 2,
                        min: this.hue.offsetTop - this.hueHandle.offsetHeight / 2,
                        h: this.hue.offsetHeight,
                        left: this.hue.offsetLeft + pos.w / 2 - this.hueHandle.offsetWidth / 2 - 1
                    })
                }
                return this.huePosition;
            },

            _setValueAttr: function(value){
                //value should be either a string with a hex color, or a hsv object
                var hsv;
                if (typeof value == 'string'){
                    value = value.toUpperCase();
                    hsv = color.fromHex(value).toHsv();
                } else {
                    hsv = value;
                    value = color.fromHsv(value).toHex().toUpperCase();
                }
                this.color = hsv;
                this._set('value', value);
                
                //update the swatch
                domStyle.set(this.swatch, 'backgroundColor', value);

                //update hex textbox
                if (this.hex && this.hex.get('value') != value){
                    this.hex.set('value', value);
                }

                if (this.box){
                    var huePosition = this.get('huePosition'),
                        boxPosition = this.get('boxPosition');

                    domStyle.set(
                        this.box,
                        'backgroundColor',
                        color.fromHsv(hsv.h, 100, 100).toHex()
                    );

                    domStyle.set(
                        this.hueHandle,
                        'left',
                        huePosition.left + 'px'
                    );
                    domStyle.set(
                        this.hueHandle,
                        'top',
                        (huePosition.min + huePosition.h * (1 - hsv.h / 359)) + 'px'
                    );

                    domStyle.set(
                        this.boxHandle,
                        'left',
                        (boxPosition.minLeft + boxPosition.w * (hsv.s / 100)) + 'px'
                    );
                    domStyle.set(
                        this.boxHandle,
                        'top',
                        (boxPosition.minTop + boxPosition.h * (1 - hsv.v / 100)) + 'px'
                    );
                }
            },
            
            _setFocusNodeClassAttr: { node: "focusNode", type: "class" }            
        }
    );
});
