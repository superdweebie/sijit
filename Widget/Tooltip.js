define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/window',
    'dojo/on',
    'dojo/dom-style',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/dom-attr',
    'dojo/dom-geometry',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dojo/text!./Template/Tooltip.html',
    'dojo/query'
],
function(
        declare,
        lang,
        win,
        on,
        domStyle,
        domConstruct,
        domClass,
        domAttr,
        domGeom,
        Widget,
        TemplatedMixin,
        template
        ) {
    // module:
    //		Sds/Widget/Tooltip

    return declare(
        [Widget, TemplatedMixin],
        {
            templateString: template,

            eventShow: 'mouseover',

            eventHide: 'mouseout',

            //target: undefined,

            //content: undefined,
            
            hidden: true,

            placement: 'top',

            buildRendering: function(){
                this.inherited(arguments);

                if (this.content){
                    this.containerNode.innerHTML = this.content;
                }
            },

            startup: function(){
                this.inherited(arguments);

                if ( ! this.target){
                    this.target = this.domNode.previousElementSibling;
                }

                on(this.target, this.eventShow, lang.hitch(this, function(e){
                    this.set('hidden', false)
                }));
                on(this.target, this.eventHide, lang.hitch(this, function(e){
                    this.set('hidden', true)
                }));
            },

            _setHiddenAttr: function(value){
                if (value){
                    domClass.add(this.domNode, 'hidden');
                    domClass.remove(this.domNode, 'in top bottom left right');
                    this._set('hidden', value);
                    return;
                }

                if (domClass.contains(this.target, "disabled") || domAttr.get(this.target, "disabled")) {
                    return;
                }

                domConstruct.place(this.domNode, win.body(), 'last');
                domClass.remove(this.domNode, 'hidden');
                domClass.add(this.domNode, 'in ' + this.placement);
                this.position();
                this._set('hidden', value);
            },

            position: function() {
                var targetPos = domGeom.position(this.target),
                    tooltipPos = domGeom.position(this.domNode),
                    left,
                    top;

                switch (this.placement){
                    case 'left':
                    case 'right':
                        top = targetPos.y + targetPos.h /2 - tooltipPos.h /2;
                        break;
                    case 'top':
                        top = targetPos.y - tooltipPos.h;
                        break;
                    case 'bottom':
                        top = targetPos.y + targetPos.h;
                        break;
                }
                domStyle.set(this.domNode, 'top', top + 'px');

                targetPos = domGeom.position(this.target);
                switch (this.placement){
                    case 'left':
                        left = targetPos.x - tooltipPos.w;
                        break;
                    case 'right':
                        left = targetPos.x + targetPos.w;
                        break;
                    case 'top':
                    case 'bottom':
                        left = targetPos.x + targetPos.w / 2 - tooltipPos.w / 2;
                        break;
                }
                domStyle.set(this.domNode, 'left', left + 'px');
            }
        }
    );
});
