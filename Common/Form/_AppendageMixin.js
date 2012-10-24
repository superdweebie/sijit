define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/dom-construct',
    'dojo/dom-class'
],
function (
    declare,
    lang,
    on,
    domConstruct,
    domClass
){
    return declare(
        'Sds/Common/Form/_AppendageMixin',
        [],
        {

            // prepend: array
            //      An array of prepend definitions. Each item should be in the form:
            //      {
            //          type: 'text' | 'button',
            //          innerHTML: 'my string',
            //          clickMixin: {property object mixed into button click event object}
            //      }
            //
            //      Button click event can be listedned to with: on(widgetInstance, 'appendage-click', function(event){})
            //      The clickMixin will be mixed into the event object.
            //
            //      For shorthand, if an array item is a string, it is equivalent to a
            //      text type definition.
            //
            prepend: [],

            // append: array
            //      Same as prepend
            append: [],

            _setPrependAttr: function(value){
                this.prepend = value;
                for (var index in this.prepend){
                    this._setAppendage(this.prepend[index], true);
                }
            },

            _setAppendAttr: function(value){
                this.prepend = value;
                for (var index in this.append){
                    this._setAppendage(this.prepend[index], false);
                }
            },

            _setAppendage: function(definition, isPrepend){

                if (isPrepend){
                    domClass.add(this.appendagesWrapper,'input-prepend');
                } else {
                    domClass.add(this.appendagesWrapper,'input-append');
                }

                var tag;
                var properties = {'class': 'add-on'};
                if (typeof(definition) == 'string'){
                    definition = {
                        type: 'text',
                        innerHTML: definition
                    }
                }

                switch (definition.type){
                    case 'text':
                        tag = 'span';
                        break;
                    case 'button':
                        tag ='button';
                        properties.type = 'button';
                        properties['class'] = 'btn'
                        break;
                }
                properties.innerHTML = definition.innerHTML;


                var node;
                if (isPrepend){
                    node = domConstruct.create(
                        tag,
                        properties,
                        this.textbox,
                        'before'
                    );
                } else {
                    node = domConstruct.create(
                        tag,
                        properties,
                        this.textbox,
                        'after'
                    );
                }

                //attach button event listener
                if (definition.type == 'button'){
                    on(node, 'click', lang.hitch(this, function(){
                        this.emit('appendage-click', definition.clickMixin);
                    }))
                }
            }
        }
    );
});
