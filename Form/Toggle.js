define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/on',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    './_OptionsMixin',
    'dojo/text!./Template/Toggle.html'
],
function (
    declare,
    lang,
    array,
    on,
    domConstruct,
    domClass,
    Widget,
    TemplatedMixin,
    OptionsMixin,
    template
){
    return declare(
        [Widget, TemplatedMixin, OptionsMixin],
        {

            templateString: template,

            addOption: function(value, label){
                var existingOptions = this.get('options'),
                    node;

                if ( ! existingOptions[value]){
                    if (this.sortByLabel){
                        var created = false;
                        array.forEach(this.toggle.childNodes, lang.hitch(this, function(node){
                            if (node.tagName && node.tagName == 'BUTTON' && !created && node.text > label){
                                node = domConstruct.create('button',{'class': 'btn', value: value, innerHTML: label}, node, 'before');
                                created = true;
                            }
                        }));
                        if ( ! created){
                            node = domConstruct.create('button',{'class': 'btn', value: value, innerHTML: label}, this.toggle, 'last');
                        }
                    } else {
                        node = domConstruct.create('button',{'class': 'btn', value: value, innerHTML: label}, this.toggle, 'last');
                    }

                    on(node, 'click', lang.hitch(this, function(e){
                        e.preventDefault();
                        this.set('value', e.target.value);
                    }))
                }
            },

            removeOption: function(value){
                array.forEach(this.toggle.childNodes, function(node){
                    if (node && node.tagName && node.tagName == 'BUTTON' && node.value == value){
                        domConstruct.destroy(node);
                    }
                })
            },

            _setValueAttr: function(value){
                array.forEach(this.toggle.childNodes, function(node){
                    if (node && node.tagName && node.tagName == 'BUTTON'){
                        if (node.value == value){
                            domClass.add(node, 'active');
                        } else {
                            domClass.remove(node, 'active');
                        }
                    }
                });
                this._set('value', value);
            },

            _setFocusNodeClassAttr: { node: "focusNode", type: "class" }
        }
    )
});
