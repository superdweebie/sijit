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
        'Sds/Form/_AppendageMixin',
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
            //prepend: undefined,

            // append: array
            //      Same as prepend
            //append: undefined,

            //_appendageNodes: undefined,

            constructor: function(){
                this._appendageNodes = [];
            },

            _setPrependAttr: function(value){

                if ( ! lang.isArray(value)){
                    value = [value];
                }

                var index;
                for (index in value){
                    value[index] = this._createDefinition(value[index], true);
                }
                this.prepend = value;

                this._appendageDifference(value);
            },

            _setAppendAttr: function(value){

                if ( ! lang.isArray(value)){
                    value = [value];
                }

                var index;
                for (index in value){
                    value[index] = this._createDefinition(value[index], false);
                }
                this.append = value;

                this._appendageDifference(value);
            },

            _createAppendagesWrapper: function(){
                this.appendagesWrapper = domConstruct.create('div', null, this.focusNode, 'after');
                domConstruct.place(this.focusNode, this.appendagesWrapper, 'first');
            },

            _createDefinition: function(value, isPrepend){
                var definition = value;
                if (typeof(value) == 'string'){
                    definition = {
                        type: 'text',
                        innerHTML: definition
                    }
                }
                if (isPrepend){
                    definition.isPrepend = true;
                } else {
                    definition.isPrepend = false;
                }
                return definition;
            },

            _appendageDifference: function(definitions){
                var index;
                var index2;
                var add = [];
                var remove = [];

                for(index in definitions){
                    add.push(index);
                }

                for(index in this._appendageNodes){
                    for(index2 in definitions){
                        if (this._appendageNodes[index].definition.innerHTML == definitions[index2].innerHTML &&
                            this._appendageNodes[index].definition.isPrepend == definitions[index2].isPrepend &&
                            this._appendageNodes[index].definition.type == definitions[index2].type
                        ){
                            delete(add[index2]);
                        } else {
                            remove.push(index);
                        }
                    }
                }

                var item;
                for(index in remove){
                    item = this._appendageNodes.splice(remove[index], 1);
                    if (item.handler){
                        item.handler.remove();
                    }
                    domConstruct.destroy(item.node);
                }

                for(index in add){
                    if (add[index]){
                        this._addAppendage(definitions[index]);
                    }
                }
            },

            _addAppendage: function(definition){

                if (! this.appendagesWrapper){
                    this._createAppendagesWrapper();
                }

                if (definition.isPrepend){
                    domClass.add(this.appendagesWrapper,'input-prepend');
                } else {
                    domClass.add(this.appendagesWrapper,'input-append');
                }

                var tag;
                var properties = {'class': 'add-on'};

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
                if (definition.isPrepend){
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
                var handler;
                if (definition.type == 'button'){
                    handler = on(node, 'click', lang.hitch(this, function(){
                        this.emit('appendage-click', definition.clickMixin);
                    }))
                }

                this._appendageNodes.push({definition: definition, node: node, handler: handler});
            }
        }
    );
});
