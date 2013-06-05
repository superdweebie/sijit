define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/keys',
    'dojo/dom-style',
    'dojo/dom-geometry',
    'dijit/focus',
    '../Dnd/Moveable',
    'dojox/color/_base',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/_FocusMixin',
    'dijit/form/_FormValueMixin',
    './_LabelMixin',
    './_HelpMessagesMixin',
    'dojo/text!./Template/ColorPicker.html',
    './HexColor',
    '../Widget/Dropdown'
],
function (
    declare,
    lang,
    keys,
    domStyle,
    domGeom,
    focus,
    Moveable,
    color,
    Widget,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    FocusMixin,
    FormValueMixin,
    LabelMixin,
    HelpMessagesMixin,
    template
){
    return declare(
        [
            Widget,
            TemplatedMixin,
            WidgetsInTemplateMixin,
            FocusMixin,
            FormValueMixin,
            LabelMixin,
            HelpMessagesMixin
        ],
        {

            value: '#CCCCCC',

            templateString: template,

            hidden: true,

            //color: undefined,

            //preEditValue: undefined,

            startup: function(){

                this.inherited(arguments);

                //set up watch on textbox
                var hexWatch;
                this.hex.on('focus', lang.hitch(this, function(){
                    hexWatch = this.hex.watch('state', lang.hitch(this, function(property, oldValue, newValue){
                        if (newValue == ''){
                            this.set('value', this.hex.get('value'));
                        }
                    }));
                }));
                this.hex.on('blur', function(){
                    hexWatch.unwatch();
                });

                this.dropdown.watch('hidden', lang.hitch(this, function(p, o, n){
                    if (n == true){
                        return;
                    }

                    var huePosition = this.get('huePosition'),
                        boxPosition = this.get('boxPosition'),
                        dndHueHandle = new Moveable(this.hueHandle),
                        dndBoxHandle = new Moveable(this.boxHandle);

                    dndHueHandle.on('moveStop', lang.hitch(this, function(mover){
                        //change value after hue drag
                        this.set(
                            'value',
                            {
                                h: 359 * (1 - (mover.node.offsetTop - huePosition.min) / (huePosition.h)),
                                s: this.color.s,
                                v: this.color.v
                            }
                        );
                    }));
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
                    dndBoxHandle.on('moveStop', lang.hitch(this, function(mover){
                        //change value after pointer drag
                        this.set(
                            'value',
                            {
                                h: this.color.h,
                                s: 100 * ((mover.node.offsetLeft - boxPosition.minLeft) / boxPosition.w),
                                v: 100 * (1 - (mover.node.offsetTop - boxPosition.minTop) / boxPosition.h)
                            }
                        );
                    }));
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
                    this.preEditValue = this.value;
                    this.set('value', this.value);
                    focus.focus(this.boxHandle);
                }));
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
                        left: this.hue.offsetLeft + pos.w / 2 - this.hueHandle.offsetWidth / 2
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

                if (this.dropdown.get('hidden')){
                    return;
                }

                //update hex textbox
                if (this.hex && this.hex.get('value') != value){
                    this.hex.set('value', value);
                }

                //update the box and hue markers
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
            },

            _setFocusNodeClassAttr: { node: "focusNode", type: "class" }
        }
    );
});
