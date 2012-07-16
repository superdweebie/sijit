define
(
    [ 
        'dojo/_base/declare', 
        'dojo/_base/Deferred',           
        'sds/store/CachedJsonRest',
        'sds/data/ObjectStore',
        'sds/Utils',
        'dojo/Evented'
    ],
    function
    (
        declare, 
        Deferred,
        CachedJsonRest,
        ObjectStore,
        Utils,
        Evented
    ) 
    {
        return declare
        (
            'sds.services.ObjectService', 
            [Evented], 
            {
                stores: [],
                _createStore: function(objclass)
                {
                    var store;
                    var target = Utils.fullUrl('/' + objclass + '/');
                    var storeAdapter;
                    store = new CachedJsonRest({target: target});
                    storeAdapter = new ObjectStore({objectStore: store});
                    var result = {objclass: objclass, store: store, storeAdapter: storeAdapter};
                    this.stores.push(result);
                    return result;
                },
                preloadCache: function(data)
                {
                    var dataIndex;
                    var store;
                    for (dataIndex in data)
                    {
                        store = this.getStore(data[dataIndex].objclass);
                        store.preloadCache([data[dataIndex]]);
                    }                    
                },
                flushCache: function()
                {
                    var storeIndex;
                    for (storeIndex in this.stores)
                    {
                        this.stores[storeIndex].flushCache();
                    }
                },
                _findStore: function(objclass)
                {
                    var index;
                    for(index in this.stores)
                    {
                        if (this.stores(index).objclass == objclass)
                        {
                            return this.stores(index);
                        }
                    }
                    return undefined;
                },
                getStore: function(objclass)
                {
                    var result = this._findStore(objclass);
                    var store;
                    if (result)
                    {
                        store = result.store;
                    } else {
                        store = this._createStore(objclass).store;
                    }                
                    return store;
                },
                getStoreAdapter: function(objclass)
                {
                    var result = this._findStore(objclass);
                    var storeAdapter;
                    if (result)
                    {
                        storeAdapter = result.storeAdapter;
                    } else {
                        storeAdapter = this._createStore(objclass).storeAdapter;
                    }               
                    return storeAdapter;
                },
                getObjects: function(ids)
                {
                    var index;
                    var store;
                    var objects = [];
                    var fetchCount = 0;
                    var fetchDeferred = new Deferred();                             
                    for (index in ids)
                    {
                        store = this.getStore(ids[index].objclass);
                        store.get()                        
                        Deferred.when
                        (
                            store.get(ids[index].name),
                            function(object)
                            {                                  
                                objects.push(object);
                                fetchCount ++;
                                if(fetchCount == ids.length)
                                {
                                    fetchDeferred.resolve(objects);
                                }                                        
                            }
                        );                       
                    }                     
                    return fetchDeferred;
                }
            }
        );          
    }
);           


