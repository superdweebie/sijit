define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-style',
    'dojo/dom-class',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'dojo/dom-geometry',
    'dojo/window',
    'dojo/on',
    'dojo/keys',
    'dijit/focus',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_FocusMixin',
    './_HideableMixin',
    'dojo/text!./Template/Dropdown.html'
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
    on,
    keys,
    focus,
    Widget,
    TemplatedMixin,
    FocusMixin,
    HideableMixin,
    template
){
    // module:
    //    	Sds/Widget/Dropdown

    return declare(
        [Widget, TemplatedMixin, FocusMixin, HideableMixin],
        {
            templateString: template,

            //target: undefined,

            //dropdown: undefined,

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

                on(this.target, 'click', lang.hitch(this, this.onClick));
            },

            _show: function(){
                this.addKeyListener();
                domConstruct.place(this.domNode, document.body, 'last');
                domClass.remove(this.domNode, 'hidden');
                domClass.add(this.domNode, 'open');
                this.position();
                this._priorFocus = focus.curNode;
                focus.focus(this.dropdown);
            },

            _hide: function(){
                domClass.remove(this.domNode, 'open');
                domClass.add(this.domNode, 'hidden');
                focus.focus(this._priorFocus);
                this.removeKeyListener();
            },

            addKeyListener: function(){
                this.keyListener = on(document.body, 'keypress', lang.hitch(this, this.onKey));
            },

            removeKeyListener: function(){
                if (this.keyListener){
                    this.keyListener.remove();
                    delete(this.keyListener);
                }
            },

            onKey: function(event){
                event.preventDefault();
                switch(event.keyCode){
                    case keys.ESCAPE:
                        this.hide();
                        this.emit('cancel', {});
                    case keys.ENTER:
                        this.hide();
                }
                this.removeKeyListener();
            },

            onClick: function(event){
                event.preventDefault();
                if (!this.blurDelay){
                    this.toggle();
                }
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
                domStyle.set(this.dropdown, 'left', targetPos.x + 'px');
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
