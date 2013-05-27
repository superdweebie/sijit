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
    template
){
    // module:
    //    	Sds/Widget/Dropdown

    return declare(
        [Widget, TemplatedMixin, FocusMixin],
        {
            templateString: template,

            hidden: true,

            //target: undefined,

            //dropdown: undefined,

            startup: function(){
                this.inherited(arguments);

                this.dropdown = this.containerNode.firstElementChild;
                if ( ! this.target){
                    this.target = this.domNode.previousElementSibling;
                }

                domClass.add(this.dropdown, 'dropdown-menu');
                if (!domAttr.has(this.dropdown, 'tabindex')){
                    domAttr.set(this.dropdown, 'tabindex', 1);
                }
                on(this.target, 'click', lang.hitch(this, this.onClick));
            },

            toggle: function(){
                this.set('hidden', ! this.get('hidden'));
            },

            _setHiddenAttr: function(value){
                if (value){
                    domClass.remove(this.domNode, 'open');
                    domClass.add(this.domNode, 'hidden');
                    focus.focus(this.target);
                    this.removeKeyListener();
                    this._set('hidden', value);
                    return;
                }

                if (domClass.contains(this.target, "disabled") || domAttr.get(this.target, "disabled")) {
                    return;
                }

                this.addKeyListener();
                domConstruct.place(this.domNode, document.body, 'last');
                domClass.remove(this.domNode, 'hidden');
                domClass.add(this.domNode, 'open');
                this.position();
                focus.focus(this.dropdown);
                this._set('hidden', value);
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
                        this.set('hidden', true);
                        this.emit('cancel', {});
                    case keys.ENTER:
                        this.set('hidden', true);
                }
                this.removeKeyListener();
            },

            onClick: function(event){
                event.preventDefault();
                if (!this.blurDelay){
                    this.set('hidden', false);
                }
            },

            position: function() {
                var targetPos = domGeom.position(this.target),
                    dropdownPos = domGeom.position(this.dropdown),
                    box = win.getBox(),
                    top;

                if (targetPos.y + targetPos.h + dropdownPos.h > box.h){
                    top = targetPos.y - dropdownPos.h - 5; //TODO remove the -5 fudge
                } else {
                    top = targetPos.y + targetPos.h;
                }
                domStyle.set(this.dropdown, 'top', top + 'px');
                domStyle.set(this.dropdown, 'left', targetPos.x + 'px');
            },

            onBlur: function(){
                this.set('hidden', true);
                this.blurDelay = true;
                setTimeout(lang.hitch(this, function(){
                    delete(this.blurDelay);
                }), 200);
            }
        }
    );
});
