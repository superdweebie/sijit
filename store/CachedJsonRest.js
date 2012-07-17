define ([
        'dojo/_base/declare',
        'dojo/store/Memory',
        'dojo/store/JsonRest',
        'dojo/store/Cache'
    ],
    function (
        declare,
        Memory,
        JsonRest,
        Cache
    ) {
        return declare (
            'sijit.store.CachedJsonRest',
            null,
            {
                target: undefined,
                _memoryStore: undefined,
                _restStore: undefined,
                _cacheStore: undefined,
                constructor: function(target) {
                    this.target = target;
                    this._constructStore();
                },
                _constructStore: function() {
                    this._memoryStore = new Memory({});
                    this._restStore = new JsonRest({target: this.target});
                    this._cacheStore = new Cache(this._restStore, this._memoryStore);
                },
                preloadCache: function(data) {
                    var dataIndex;
                    for (dataIndex in data) {
                        this._memoryStore.put(data[dataIndex], {overwrite: true});
                    }
                },
                flushCache: function() {
                    this._constructStore();
                },
                getIdentity: function(object) {
                    return object['id'];
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


