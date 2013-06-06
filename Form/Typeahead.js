define([
    'dojo/_base/declare',
    'dojo/_base/array',
    '../lang',
    'dojo/on',
    'dojo/dom-attr',
    'dojo/dom-style',
    'dojo/dom-construct',
    '../Widget/TypeaheadDropdown',
    './ValidationTextBox',
    './_OptionsMixin'
],
function (
    declare,
    array,
    lang,
    on,
    domAttr,
    domStyle,
    domConstruct,
    TypeadheadDropdown,
    ValidationTextBox,
    OptionsMixin
){
    // module:
    //		Sds/Form/Typeahead

    return declare(
        [ValidationTextBox, OptionsMixin],
        {
            maxItems: 8,

            minLength: 1,

            // queryThrottle: integer
            // A value in milliseconds
            // The store will not be queried at a rate faster than the set queryThrottle interval.
            // Query results are cached and used to update the typeahead options while
            // queries on the store are throttled
            queryThrottle: 0,

            _readyToQuery: true,

            _pendingQuery: false,

            _cachedItems: [],

            //_cachedResult: undefined,

            _itemCount: 0,

            buildRendering: function(){
                this.dropdown = new TypeadheadDropdown({content: '<ul></ul>'});
                this.inherited(arguments);
                this.dropdown.set('target', this.textbox);
            },

            startup: function(){
                this.inherited(arguments);
                this.dropdown.startup();
                this.dropdown.watch('hidden', lang.hitch(this, '_dropdownWatcher'));
                this.watch('value', lang.hitch(this, '_valueWatcher'));
            },

            _dropdownWatcher: function(property, oldValue, newValue){
                if (!newValue){
                    domStyle.set(this.dropdown.dropdown, 'width', domStyle.get(this.textbox, 'width') + 'px');
                }
            },

            _valueWatcher: function(property, oldValue, newValue){
                if (newValue.length < this.minLength){
                    return;
                }

                var re = new RegExp(newValue, 'ig'),
                    storeLabel = this.storeLabel;
                this.set('query', function(object){
                    return object[storeLabel].match(re);
                });
                this.updateOptions().then(lang.hitch(this, function(){
                    if (this.dropdown.get('hidden')){
                        this.dropdown.show();
                    }
                }));
            },

            updateOptions: function(){
                var returnValue = this.inherited(arguments);

                returnValue.then(lang.hitch(this, function(){array.forEach(this.dropdown.dropdown.childNodes, lang.hitch(this, function(node){
                    var a = node.childNodes[0];
                    a.innerHTML = domAttr.get(a, 'data').replace(new RegExp(this.value, 'ig'), function($1, match){
                        return '<strong>' + $1 + '</strong>';
                    });
                }))}));

                return returnValue
            },

            addOption: function(value, label){
                var existingOptions = this.get('options'),
                    option,
                    newA,
                    newLI,
                    i;

                if (existingOptions[value] || this._itemCount >= this.maxItems){
                    return;
                }

                newA = domConstruct.create('A', {href: value, data: label});

                if (this.sortByLabel){
                    for (i = 0; i < this.dropdown.dropdown.childNodes.length; i++){
                        option = this.dropdown.dropdown.childNodes[i];
                        if (option.nodeName == 'LI' && option.childNodes[0].data > label){
                            newLI = domConstruct.create(
                                'LI',
                                null,
                                option,
                                'before'
                            );
                            break;
                        }
                    }
                }
                if (!newLI){
                    newLI = domConstruct.create(
                        'LI',
                        null,
                        this.dropdown.dropdown,
                        'last'
                    );
                }

                domConstruct.place(newA, newLI, 'only');
                on(newA, 'click', lang.hitch(this, function(e){
                    e.preventDefault();
                    this.set('value', label);
                    this.dropdown.set('hidden', true);
                }));

                this._itemCount++;
            },

            removeOption: function(value){
                var i, option;
                for (i = 0; i < this.dropdown.dropdown.childNodes.length; i++){
                    option = this.dropdown.dropdown.childNodes[i];
                    if (option.nodeName == 'LI' && domAttr.get(option.childNodes[0], 'href') == value){
                        domConstruct.destroy(option);
                        this._itemCount--;
                        break;
                    }
                }
            }
//            postCreate: function(){
//                this.inherited(arguments);
//
//                this._typeahead = new Typeahead(
//                    this.appendagesWrapper ? this.appendagesWrapper : this.focusNode,
//                    {
//                        items: this.items
//                    }
//                );
//
//                //override Typeahead lookup function to use the dojo/store with timing delay
//                this._typeahead.lookup = lang.hitch(this, function(){
//
//                    this._typeahead.query = this.get('value');
//                    if (!this._typeahead.query || this._typeahead.query.length < this.minLength) {
//                        return this._typeahead.shown ? this._typeahead.hide() : this._typeahead;
//                    }
//
//                    var queryStore = lang.hitch(this, function(){
//                        when(this.get('store').query(this.getQuery(this._typeahead.query)), lang.hitch(this, function (data) {
//                            this._cachedResult = array.map(data, lang.hitch(this, function(item){
//
//                                if(array.indexOf(this._cachedItems, item) == -1) {
//                                    this._cachedItems.push(item);
//                                }
//
//                                return item[this.storeLabel];
//                            }));
//                            this._typeahead.process(this._cachedResult);
//                        }));
//                    });
//
//                    if (this._readyToQuery){
//                        this._readyToQuery = false;
//                        setTimeout(lang.hitch(this, function(){
//                            this._readyToQuery = true;
//                            if (this._pendingQuery){
//                                this._pendingQuery = false;
//                                this._typeahead.lookup();
//                            }
//                        }), this.queryThrottle);
//                        queryStore();
//                    } else {
//                        this._pendingQuery = true;
//                        this._typeahead.process(this._cachedResult);
//                    }
//                });
//
//                //override Typeahead select
//                this._typeahead.select = lang.hitch(this, function () {
//                    this._pendingQuery = false;
//                    return this.setInputValue();
//                });
//            },


//            getSelectedItem: function() {
//                var selected, value = this.getSelectedValue();
//
//                array.forEach(this._cachedItems, lang.hitch(this, function(item){
//                    if(item[this.storeLabel] == value) {
//                        selected = item;
//                    }
//                }));
//
//                return selected;
//            },

//            getSelectedValue: function() {
//                var li = query('.active', this._typeahead.menuNode)[0];
//                return domAttr.get(li, 'data-value');
//            },
//
//            setInputValue: function() {
//                var val = this.getSelectedValue();
//                this.set('value', this._typeahead.updater(val));
//                this.emit('changed', val);
//                return this._typeahead.hide();
//            },
//
//            getQuery: function(value) {
//                var re = new RegExp(value, 'i');
//                var storeLabel = this.storeLabel;
//
//                return function(object){
//                    return object[storeLabel].match(re)
//                };
//            },

//            _getStoreAttr: function() {
//                //set up the data store
//                if (this.store){
//                    if (typeof this.store == 'string'){
//                        //get store from storeManager
//                        this.store = storeManager.getStore(this.store);
//                    }
//                } else {
//                    //store hasn't been explicitly set, so we need to create one
//                    this.store = new Memory({data: array.map(this.data, function(item){
//                        if (typeof item == 'object'){
//                            return item;
//                        } else {
//                            return {id: item}
//                        }
//                    })});
//                }
//
//                return this.store;
//            }
        }
    );
});