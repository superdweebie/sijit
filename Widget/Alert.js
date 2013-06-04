define([
    'dojo/_base/declare',
    'dojo/dom-class',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    './_HideableMixin',
    'dojo/text!./Template/Alert.html',
    'dojo/text!./Template/CloseButton.html'
],
function (
    declare,
    domClass,
    Widget,
    TemplatedMixin,
    HideableMixin,
    template,
    closeButtonTemplate
){
    // module:
    //    	Sds/Widget/Alert

    return declare(
        [Widget, TemplatedMixin, HideableMixin],
        {
            templateString: template,

            closeButtonTemplate: closeButtonTemplate,

            onCancelClick: function(e){
                e.preventDefault();
                this.hide();
            },

            _show: function(){
                domClass.remove(this.domNode, 'hide');
            },

            _hide: function(){
                domClass.add(this.domNode, 'hide');
            }
        }
    );
});
