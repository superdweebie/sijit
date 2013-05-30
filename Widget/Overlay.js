define([
	'dojo/_base/declare',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/dom-geometry',
	'dojo/dom-style',
	'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'dojo/text!./Template/Overlay.html'
],

function(
    declare,
    domClass,
    domConstruct,
    domGeom,
    domStyle,
    _Widget,
    _TemplatedMixin,
    template
) {

return declare([_Widget, _TemplatedMixin],{
	// summary:
	//		A widget designed to act as a Standby/Busy/Disable/Blocking widget to indicate a
	//		particular DOM node is processing and cannot be clicked on at this time.
	//		This widget uses absolute positioning to apply the overlay and image.
    //      Inspired by dojox/widget/Standby

	//target: undefined,

    //content: undefined,

	templateString: template,

    //hidden: false,

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

        this.set('hidden', this.hidden);
    },

    _setHiddenAttr: function(value){

        if (!this._started){
            this._set('hidden', value);
            return;
        }

        if (value){
            domClass.add(this.domNode, 'hide');
            this._set('hidden', value);
            return;
        }

        domConstruct.place(this.domNode, document.body, 'last');
        domClass.remove(this.domNode, 'hide');
        this._position();
        this._set('hidden', value);
    },

    _position: function(){

        var targetPos = domGeom.position(this.target),
            containerPos = domGeom.position(this.containerNode);

        //overlay position
        domStyle.set(this.overlay, 'top', targetPos.y + 'px');
        domStyle.set(this.overlay, 'left', targetPos.x + 'px');
        domStyle.set(this.overlay, 'height', targetPos.h + 'px');
        domStyle.set(this.overlay, 'width', targetPos.w + 'px');

        //content position
        domStyle.set(this.containerNode, 'top', ((targetPos.y + (targetPos.h - containerPos.h) / 2)) + 'px');
        domStyle.set(this.containerNode, 'left', ((targetPos.x + (targetPos.w - containerPos.w) / 2)) + 'px');
    }
});

});
