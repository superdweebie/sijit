define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',   
    'dojo/query',
    'dojo/dom-attr',    
    'dojo/store/Memory',
    'bootstrap/Typeahead',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'Sds/Common/Form/_TextBoxMixin',
    'get!Sds/Store/storeManager',
    'dojo/text!./Template/Typeahead.html'    
],
function (
    declare,
    lang,
    array,    
    query,
    domAttr,
    Memory,
    Typeahead,
    Widget,
    TemplatedMixin,
    TextBoxMixin,
    storeManager,
    template
){
    // module:
    //		Sds/Common/Typeahead

    return declare(
        'Sds/Common/Form/Typeahead',
        [Widget, TemplatedMixin, TextBoxMixin],
        {
            
            templateString: template,
            
            _typeahead: undefined,
                        
            // store: dojo/store/api/Store
            store: undefined,

            // storeLabelAttr: string
            storeLabel: 'id',
                       
            items: 8,
            
            minLength: 1,
            
            // queryThrottle: integer
            // A value in milliseconds
            // The store will not be queried at a rate faster than the set queryThrottle interval.
            // Query results are cached and used to update the typeahead options while
            // queries on the store are throttled
            queryThrottle: 0,
            
            _readyToQuery: true,
            
            _pendingQuery: false,
            
            _cachedResult: undefined,
            
            postCreate: function(){
                this.inherited(arguments);
                                                        
                this._typeahead = new Typeahead(this.textbox, {
                    items: this.items
                });
              
                //override Typeahead lookup function to use the dojo/store with timing delay
                this._typeahead.lookup = lang.hitch(this, function(){
                    
                    this._typeahead.query = this.get('value');                     
                    if (!this._typeahead.query || this._typeahead.query.length < this.minLength) {
                        return this._typeahead.shown ? this._typeahead.hide() : this._typeahead;
                    }
            
                    var queryStore = lang.hitch(this, function(){
                        var re = new RegExp(this._typeahead.query, 'i');
                        var storeLabel = this.storeLabel;                    
                        var query = function(object){
                            return object[storeLabel].match(re)
                        };

                        //this._typeahead.matcher = storeResultMatcher;
                        this._cachedResult = this.get('store').query(query).map(lang.hitch(this, function(item){
                            return item[this.storeLabel];
                        }));
                        this._typeahead.process(this._cachedResult);                        
                    })
                    
                    if (this._readyToQuery){
                        this._readyToQuery = false;
                        setTimeout(lang.hitch(this, function(){
                            this._readyToQuery = true;
                            if (this._pendingQuery){
                                this._pendingQuery = false;
                                this._typeahead.lookup();
                            }
                        }), this.queryThrottle);
                        queryStore();
                    } else {
                        this._pendingQuery = true;                       
                        this._typeahead.process(this._cachedResult);                         
                    }
                });
                                
                //override Typeahead select
                this._typeahead.select = lang.hitch(this, function () {
                    this._pendingQuery = false;
                    var li = query('.active', this._typeahead.menuNode)[0];
                    this.set('value', this._typeahead.updater(domAttr.get(li, 'data-value')));
                    return this._typeahead.hide();
                });                
            },
                        
            _getStoreAttr: function(){

                //set up the data store                                
                if (this.store){
                    if (typeof this.store == 'string'){
                        //get store from storeManager
                        this.store = storeManager.getStore(this.store);     
                    }
                } else {
                    //store hasn't been explicitly set, so we need to create one
                    this.store = new Memory({data: array.map(this.data, function(item){
                        if (typeof item == 'object'){
                            return item;
                        } else {
                            return {id: item}
                        }
                    })});                   
                }                

                return this.store;
            }
//            sourceItems: [],
//            listen: function () {
//                on(this.domNode, 'blur', lang.hitch(this, 'blur'));
//                on(this.domNode, 'keypress', lang.hitch(this, 'keypress'));
//                on(this.domNode, 'keyup', lang.hitch(this, 'keyup'));
//                if(sniff('webkit') || sniff('ie')) {
//                    on(this.domNode, 'keydown', lang.hitch(this, 'keydown'));
//                }
//                on(this.menuNode, on.selector('li', 'mouseover'), lang.hitch(this, 'mouseenter'));
//            },
//
//            process: function (items) {
//                items = array.filter(items, function (item) {
//                    return this.matcher(item.value);
//                }, this);
//                items = this.sorter(items);
//                if (!items.length) {
//                    return this.shown ? this.hide() : this;
//                }
//                this.render(items.slice(0, this.options.items)).show();
//            },
//
//            select: function (node) {
//                if(node.value) {
//                    this.domNode.value = node.value;
//                    this.emit('changed', node);
//                }
//                return this.hide();
//            },
//
//            sorter: function (items) {
//                var beginswith = [],
//                caseSensitive = [],
//                caseInsensitive = [],
//                item;
//
//                while (item = items.shift()) {
//                    if (!item.value.toString().toLowerCase().indexOf(this.query.toString().toLowerCase())) {
//                        beginswith.push(item);
//                    } else if (item.value.toString().indexOf(this.query) >= 0) {
//                        caseSensitive.push(item);
//                    } else {
//                        caseInsensitive.push(item);
//                    }
//                }
//                return beginswith.concat(caseSensitive, caseInsensitive);
//            },
//
//            render: function (items) {
//                this._reset();
//                array.forEach(items, lang.hitch(this, function(item){
//                    var i = new TypeaheadItem({
//                        label: this.highlighter(item.label),
//                        value: item.value,
//                        data: item.data
//                    })
//                    this.sourceItems.push(i);
//                    this.menuNode.appendChild(i.domNode);
//                    i.on('clicked', lang.hitch(this, this.select));
//                }));
//
//                return this;
//            },
//
//            _reset: function() {
//                array.forEach(this.sourceItems, lang.hitch(this, function(item){
//                    item.destroy();
//                }));
//                this.sourceItems = new Array();
//            },
//
//            click: function (e) {
//                e.stopPropagation();
//                e.preventDefault();
//            },
//
//            get: function(e) {
//                e.stopPropagation();
//                e.preventDefault();
//                if (this.shown) {
//                    return;
//                }
//                this.lookup();
//            }
        }
    );
});