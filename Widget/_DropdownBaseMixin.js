define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-style',
    'dojo/dom-class',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'dojo/dom-geometry',
    'dojo/window',
    'dijit/_FocusMixin',
    './_HideableMixin'
],
function (
    declare,
    lang,
    domStyle,
    domClass,
    domAttr,
    domConstruct,
    domGeom,
    win,
    FocusMixin,
    HideableMixin
){
    // module:
    //    	Sds/Widget/Dropdown

    return declare(
        [FocusMixin, HideableMixin],
        {

            //target: undefined,

            //dropdown: undefined,

            placement: 'left', //left || right

            buildRendering: function(){
                this.inherited(arguments);

                if (this.content){
                    this.containerNode.innerHTML = this.content;
                }

                this.dropdown = this.containerNode.firstElementChild;

                domClass.add(this.dropdown, 'dropdown-menu');
                if (!domAttr.has(this.dropdown, 'tabindex')){
                    domAttr.set(this.dropdown, 'tabindex', 1);
                }
            },

            startup: function(){
                if ( ! this.target){
                    this.target = this.domNode.previousElementSibling;
                }
                this.inherited(arguments);
            },

            _show: function(){
                domConstruct.place(this.domNode, document.body, 'last');
                domClass.remove(this.domNode, 'hidden');
                domClass.add(this.domNode, 'open');
                this.position();
            },

            _hide: function(){
                domClass.remove(this.domNode, 'open');
                domClass.add(this.domNode, 'hidden');
            },

            position: function() {
                var targetPos = domGeom.position(this.target, true),
                    dropdownPos = domGeom.position(this.dropdown, true),
                    box = win.getBox(),
                    scroll = domGeom.docScroll(),
                    top;

                    box.w += scroll.x;
                    box.h += scroll.y;

                if (targetPos.y + targetPos.h + dropdownPos.h > box.h){
                    top = targetPos.y - dropdownPos.h - 5; //TODO remove the -5 fudge
                } else {
                    top = targetPos.y + targetPos.h;
                }
                domStyle.set(this.dropdown, 'top', top + 'px');

                if (this.placement == 'left'){
                    domStyle.set(this.dropdown, 'left', targetPos.x + 'px');
                } else if (this.placement == 'right') {
                    domStyle.set(this.dropdown, 'left', (targetPos.x + targetPos.w - dropdownPos.w) + 'px');
                }
            },

            onBlur: function(){
                this.hide();
                this.blurDelay = true;
                setTimeout(lang.hitch(this, function(){
                    delete(this.blurDelay);
                }), 200);
            }
        }
    );
});
