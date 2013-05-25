define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/on',
    'dojo/dom-construct',
    'dojo/dom-class'
],
function (
    declare,
    lang,
    array,
    on,
    domConstruct,
    domClass
){
    return declare(
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

            addPrependage: function(value){
                if ( ! lang.isArray(value)){
                    value = [value];
                }
                if (this.append){
                    value = this.prepend.concat(value);
                }
                this.set('prepend', value);
            },

            addAppendage: function(value){
                if ( ! lang.isArray(value)){
                    value = [value];
                }
                if (this.append){
                    value = this.append.concat(value);
                }
                this.set('append', value);
            },

            _setPrependAttr: function(value){

                var index;

                if ( ! lang.isArray(value)){
                    value = [value];
                }

                for (index in value){
                    value[index] = this._createDefinition(value[index], true);
                }

                this._removeAppendages(true);
                for (index in value){
                    this._addAppendage(value[index]);
                }
                this._set('prepend', value);
            },

            _setAppendAttr: function(value){

                var index;

                if ( ! lang.isArray(value)){
                    value = [value];
                }

                for (index in value){
                    value[index] = this._createDefinition(value[index], false);
                }

                this._removeAppendages(false);
                for (index in value){
                    this._addAppendage(value[index]);
                }
                this._set('append', value);
            },

            _createAppendagesWrapper: function(){
                this.appendagesWrapper = domConstruct.create('div', null, this.focusNode, 'after');
                domConstruct.place(this.focusNode, this.appendagesWrapper, 'first');
            },

            _createDefinition: function(value, isPrepend){
                if (typeof(value) == 'string'){
                    value = {
                        type: 'text',
                        innerHTML: value
                    }
                }
                value.isPrepend = !!isPrepend;

                return value;
            },

            _removeAppendages: function(isPrepend){

                var index,
                    item;

                for(index in this._appendageNodes){
                    item = this._appendageNodes[index];
                    if (item.definition.isPrepend == isPrepend){
                        if (item.handler){
                            item.handler.remove();
                        }
                        domConstruct.destroy(item.node);
                        delete(this._appendageNodes[index]);
                    }
                }
                this._appendageNodes = array.filter(this._appendageNodes, function(item){return item});
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

                var tag,
                    properties = {'class': 'add-on'},
                    node,
                    handler;

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

                node = domConstruct.create(
                    tag,
                    properties,
                    this.textbox,
                    definition.isPrepend ? 'before' : 'after'
                );

                //attach button event listener
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
