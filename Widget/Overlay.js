define([
	'dojo/_base/declare',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/dom-geometry',
	'dojo/dom-style',
    'dojo/window',
	'dijit/_Widget',
	'dijit/_TemplatedMixin',
    './_HideableMixin',
    'dojo/text!./Template/Overlay.html'
],

function(
    declare,
    domClass,
    domConstruct,
    domGeom,
    domStyle,
    win,
    _Widget,
    _TemplatedMixin,
    HideableMixin,
    template
) {

return declare([_Widget, _TemplatedMixin, HideableMixin],{
	// summary:
	//		A widget designed to act as a Standby/Busy/Disable/Blocking widget to indicate a
	//		particular DOM node is processing and cannot be clicked on at this time.
	//		This widget uses absolute positioning to apply the overlay and image.
    //      Inspired by dojox/widget/Standby

	//target: undefined,

    //placementNode: undefined,

    //content: undefined,

	templateString: template,

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

        if ( ! this.placementNode){
            this.placementNode = document.body;
        }
        domConstruct.place(this.domNode, this.placementNode, 'last');

        this.inherited(arguments);
    },

    _show: function(){
        domClass.remove(this.domNode, 'hide');
        this._position();
    },

    _hide: function(){
        domClass.add(this.domNode, 'hide');
        return;
    },

    _position: function(){

        var targetPos,
            containerPos = domGeom.position(this.containerNode);

        if (this.target == document.body){
            targetPos = win.getBox();
            targetPos.x = 0;
            targetPos.y = 0;
            domClass.add(this.overlay, 'overlay-document-body');
        } else {
            targetPos = domGeom.position(this.target);

            //overlay position
            domStyle.set(this.overlay, 'top', targetPos.y + 'px');
            domStyle.set(this.overlay, 'left', targetPos.x + 'px');
            domStyle.set(this.overlay, 'height', targetPos.h + 'px');
            domStyle.set(this.overlay, 'width', targetPos.w + 'px');
        }

        //content position
        domStyle.set(this.containerNode, 'top', ((targetPos.y + (targetPos.h - containerPos.h) / 2)) + 'px');
        domStyle.set(this.containerNode, 'left', ((targetPos.x + (targetPos.w - containerPos.w) / 2)) + 'px');
    }
});

});
