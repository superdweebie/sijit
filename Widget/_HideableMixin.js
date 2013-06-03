define([
    'dojo/_base/declare',
    'dojo/dom-class',
    'dojo/dom-attr'
],
function(
        declare,
        domClass,
        domAttr
        ) {
    // module:
    //		Sds/Widget/_HideableMixin

    return declare(
        [],
        {
            hidden: true,

            startup: function(){
                this.inherited(arguments);
                this.set('hidden', this.hidden);
            },

            show: function(){
                this.set('hidden', false);
            },

            hide: function(){
                this.set('hidden', true);
            },

            toggle: function(){
                this.set('hidden', ! this.get('hidden'));
            },

            _setHiddenAttr: function(value){
                if (!this._started){
                    this.hidden = value;
                    return; //don't set hidden attr properly until startup
                }
                value = !!value; //cast to boolean
                if (value){
                    this._hide();
                } else {
                    this._show();
                }
                this._set('hidden', value);
            },

            _show: function(){

            },

            _hide: function(){

            }
        }
    );
});
