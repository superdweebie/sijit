define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',   
    'dojo/query',
    'dojo/dom-attr',
    'dojo/when',
    'dojo/store/Memory',
    'bootstrap/Typeahead',
    'get!Sds/Store/storeManager',
    'dojo/Evented'
],
function (
    declare,
    lang,
    array,    
    query,
    domAttr,
    when,
    Memory,
    Typeahead,
    storeManager,
    Evented
){
    // module:
    //		Sds/Common/_TypeaheadMixin

    return declare(
        'Sds/Common/Form/Typeahead',
        [Evented],
        {
            
            //_typeahead: bootstrap/Typeahead,
                        
            // store: dojo/store/api/Store

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
            
            _cachedItems: [],
            
            //_cachedResult: undefined,
            
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
                        when(this.get('store').query(this.getQuery(this._typeahead.query)), lang.hitch(this, function (data) {
                            this._cachedResult = data.map(lang.hitch(this, function(item){
                                
                                if(array.indexOf(this._cachedItems, item) == -1) {
                                    this._cachedItems.push(item);
                                }
                                
                                return item[this.storeLabel];
                            }));
                            this._typeahead.process(this._cachedResult);
                        }));
                    });
                    
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
                    return this.setInputValue();
                });                
            },
            
            getSelectedItem: function() {
                var selected, value = this.getSelectedValue();
                
                array.forEach(this._cachedItems, lang.hitch(this, function(item){
                    if(item[this.storeLabel] == value) {
                        selected = item;
                    }
                }));
                
                return selected;
            },
            
            getSelectedValue: function() {
                var li = query('.active', this._typeahead.menuNode)[0];
                return domAttr.get(li, 'data-value');
            },
            
            setInputValue: function() {
                var val = this.getSelectedValue();
                this.set('value', this._typeahead.updater(val));
                this.emit('changed', val);
                return this._typeahead.hide();
            },
            
            getQuery: function(value) {
                var re = new RegExp(value, 'i');
                var storeLabel = this.storeLabel;
                
                return function(object){
                    return object[storeLabel].match(re)
                };
            },
                        
            _getStoreAttr: function() {
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
        }
    );
});