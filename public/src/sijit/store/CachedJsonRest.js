define ([
        'dojo/_base/declare',
        'dojo/store/Memory',
        'dojo/store/JsonRest',
        'dojo/store/Cache',
        'dojo/store/Observable'
    ],
    function (
        declare,
        Memory,
        JsonRest,
        Cache,
        Observable
    ) {
        // module:
        //		sijit/store/CachedJsonRest

        return declare (
            'sijit.store.CachedJsonRest',
            null,
            {
                // summary:
                //		A json rest store with a memory store cache. Note that queries are
                //		not cached, only individual results. The memory store can be
                //		preloaded.

                // target: string
                //		A url pointing to the json rest service
                target: undefined,

                // _memoryStore: object
                //      The actual cache
                _memoryStore: undefined,

                // _restStore: object
                //      The json rest store
                _restStore: undefined,

                // _cacheStore: object
                //      The store the at wraps _restStore with _memoryStore
                _cacheStore: undefined,

                constructor: function(/*string*/target) {
                    this.target = target;
                    this._constructStore();
                },
                _constructStore: function() {
                    this._memoryStore = new Memory({});
                    this._restStore = new JsonRest({target: this.target});
                    this._cacheStore = Observable(new Cache(this._restStore, this._memoryStore));
                },
                preloadCache: function(/*array*/data) {
                    // summary:
                    //     Loads the memory store with supplied data

                    for (var dataIndex in data) {
                        this._memoryStore.put(data[dataIndex], {overwrite: true});
                    }
                },
                emptyCache: function() {
                    // summary:
                    //     Cleans the cache, and reconstructs the store
                    this._constructStore();
                },
                getIdentity: function(object) {
                    return this._cacheStore.getIdentity(object);
                },
                query: function(query, directives) {
                    return this._cacheStore.query(query, directives);
                },
                get: function(id, directives) {
                    return this._cacheStore.get(id, directives);
                },
                add: function(object, directives) {
                    return this._cacheStore.add(object, directives);
                },
                put: function(object, directives) {
                    return this._cacheStore.put(object, directives);
                },
                remove: function(id, directives) {
                    return this._cacheStore.remove(id, directives);
                },
                evict: function(id) {
                    return this._cacheStore.evict(id);
                }
            }
        );
    }
);


