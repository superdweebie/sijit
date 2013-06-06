define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/keys',
    'dijit/focus',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    './_DropdownBaseMixin',
    'dojo/text!./Template/Dropdown.html'
],
function (
    declare,
    lang,
    on,
    keys,
    focus,
    Widget,
    TemplatedMixin,
    DropdownBaseMixin,
    template
){
    // module:
    //    	Sds/Widget/Dropdown

    return declare(
        [Widget, TemplatedMixin, DropdownBaseMixin],
        {
            templateString: template,

            startup: function(){
                this.inherited(arguments);
                on(this.target, 'click', lang.hitch(this, this.onClick));
            },

            _show: function(){
                this.addKeyListener();
                this.inherited(arguments);
                this._priorFocus = focus.curNode;
                focus.focus(this.dropdown);
            },

            _hide: function(){
                this.inherited(arguments);
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
            }
        }
    );
});
