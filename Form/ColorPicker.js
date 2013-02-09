define([
    'dojo/_base/declare',
    'dojo/parser',
    'dojo/dom-construct',
    'dojo/dom-style',
    'dojo/dom-class',
    'bootstrap/popover',
    'dijit/_Widget',
	'dijit/_TemplatedMixin',
    'dijit/form/_FormValueMixin',
    './_LabelMixin',
    './_HelpMessagesMixin',
    'dojo/text!./Template/ColorPicker.html',
    'dojo/text!./Template/ColorPickerPopover.html',
    'Sds/Form/TextBox'
],
function (
    declare,
    parser,
    domConstruct,
    domStyle,
    domClass,
    Popover,
    Widget,
    TemplatedMixin,
    FormValueMixin,
    LabelMixin,
    HelpMessagesMixin,
    template,
    popoverTemplate
){
    return declare(
        'Sds/Form/ColorPicker',
        [Widget, TemplatedMixin, FormValueMixin, LabelMixin, HelpMessagesMixin],
        {

            value: '#CCCCCC',

            placement: 'bottom',

            templateString: template,

            buildRendering: function(){
                this.inherited(arguments);

                this.set('value', this.value);

                this._popover = new Popover(this.button, {
                    content: this.value,
                    placement: this.placement
                });

                //this._attachTemplateNodes(this._popover.tipNode, function(n,p){ return n.getAttribute(p); });

                var self = this;
                this._popover.tip = function(){
                    if ( ! this.tipNode){
                        var tipNode = domConstruct.toDom(popoverTemplate),
                            cw = (self._startupWidgets = parser.parse(tipNode));
                        self._attachTemplateNodes(cw, function(n,p){
                            return n[p];
                        });
                        this.tipNode = tipNode
                    }
                    return this.tipNode;
                }
                this._popover.setContent = function () {
                    var tip = this.tip();
                    var content = this.getContent();
                    self.hex.set('value', content);
                    domClass.remove(tip, 'fade in top bottom left right');
                }
            },

            _setValueAttr: function(value){
                domStyle.set(this.swatch, 'backgroundColor', value);
                this.value = value;
            }
        }
    );
});
