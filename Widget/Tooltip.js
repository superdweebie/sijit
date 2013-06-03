define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/dom-style',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/dom-geometry',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    './_HideableMixin',
    'dojo/text!./Template/Tooltip.html'
],
function(
        declare,
        lang,
        on,
        domStyle,
        domConstruct,
        domClass,
        domGeom,
        Widget,
        TemplatedMixin,
        HideableMixin,
        template
        ) {
    // module:
    //		Sds/Widget/Tooltip

    return declare(
        [Widget, TemplatedMixin, HideableMixin],
        {
            templateString: template,

            eventShow: 'mouseover',

            eventHide: 'mouseout',

            //target: undefined,

            //content: undefined,

            placement: 'top',

            buildRendering: function(){
                this.inherited(arguments);

                if (this.content){
                    this.containerNode.innerHTML = this.content;
                }
            },

            startup: function(){

                if ( ! this.target){
                    this.target = this.domNode.previousElementSibling;
                }

                this.inherited(arguments);

                on(this.target, this.eventShow, lang.hitch(this, function(e){
                    this.set('hidden', false)
                }));
                on(this.target, this.eventHide, lang.hitch(this, function(e){
                    this.set('hidden', true)
                }));
            },

            _show: function(){
                domConstruct.place(this.domNode, document.body, 'last');
                domClass.remove(this.domNode, 'hidden');
                domClass.add(this.domNode, 'in ' + this.placement);
                this._position();
            },

            _hide: function(){
                domClass.add(this.domNode, 'hidden');
                domClass.remove(this.domNode, 'in top bottom left right');
            },

            _position: function() {
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
