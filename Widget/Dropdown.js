define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/event',
    'dojo/_base/window',
    'dojo/dom-style',
    'dojo/dom-class',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'dojo/dom-geometry',
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
    event,
    win,
    domStyle,
    domClass,
    domAttr,
    domConstruct,
    domGeom,
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
                    this._set('hidden', value);
                    return;
                }

                if (domClass.contains(this.target, "disabled") || domAttr.get(this.target, "disabled")) {
                    return;
                }

                this.keySignal = on(win.body(), 'keypress', lang.hitch(this, this.onKey));
                domConstruct.place(this.domNode, win.body(), 'last');
                domClass.remove(this.domNode, 'hidden');
                domClass.add(this.domNode, 'open');
                this.position();
                focus.focus(this.dropdown);
                this._set('hidden', value);
            },

            onKey: function(e){
                event.stop(e);
                switch(e.keyCode){
                    case keys.ESCAPE:
                        this.set('hidden', true);
                        this.emit('cancel', {});
                    case keys.ENTER:
                        this.set('hidden', true);
                }
                this.keySignal.remove();
            },

            onClick: function(e){
                if(e){
                    event.stop(e);
                }
                if (!this.blurDelay){
                    this.set('hidden', false);
                }
            },

            position: function() {
                var pos = domGeom.position(this.target);
                domStyle.set(this.dropdown, 'top', (pos.y + pos.h) + 'px');
                domStyle.set(this.dropdown, 'left', pos.x + 'px');
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
