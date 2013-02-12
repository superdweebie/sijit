define([
        'dojo/_base/declare',
        'dojo/_base/config',
        'dojo/Deferred',
        'dojo/DeferredList',
        'dojo/when',
        'dojo/_base/lang',
        'Sds/ModuleManager/Proxy',
        'Sds/Common/utils'
    ],
    function (
        declare,
        dojoConfig,
        Deferred,
        DeferredList,
        when,
        lang,
        Proxy,
        utils
    ) {
        // module:
        //		Sds/ModuleManager/ModuleManager

        return declare
        (
            [],
            {
                // summary:
                //		An object used for dependency injection.
                //
                // description:
                //		The config property may be populated with a config object that
                //		defines what to inject.
                //
                //      See Sds/Test/ModuleManager/Asset/config for many configuration
                //      examples and explaination of options.

                // _cache: array
                //      An array of all objects created through the ModuleManager. If an object is requested
                //      more than once, it is retrieved from this array
                _cache: [],

                // _config: Object
                //      The configuration object. Defines what to inject into objects
                _config: {},

                constructor: function(/*object*/ config){

                    this._cache = [];

                    // Default to dojo config object if no config object is supplied
                    if ( ! config) {
                        config = dojoConfig.moduleManager;
                    }

                    this._config = config;
                },

                _create: function(/*mixed*/ identifier) {
                    // summary:
                    //     Used to create an object with the supplied identifier
                    // tags:
                    //     protected

                    var config;
                    var base;
                    var defaultDirectives = {
                        declare: false,
                        define: false,
                        cache: true,
                        clone: false
                    };

                    switch (true){
                        case typeof(identifier) == 'string':
                            config = this.getIdentifierConfig(identifier);
                            if ( ! config){
                                config = {};
                            }

                            //Marshal directives
                            if ( ! config.directives){
                                config.directives = defaultDirectives;
                            } else {
                                config.directives = lang.mixin(defaultDirectives, config.directives);
                            }

                            //Check for explicit base
                            base = identifier;
                            if (config.base){
                                base = config.base;
                            }

                            break;
                        case typeof(identifier) == 'object':
                            config = lang.clone(identifier);

                            //Marshal directives
                            config.directives = defaultDirectives;
                            config.directives.cache = false; //Never cache nested configs

                            identifier = null;
                            base = config.base;
                            if (!base){
                                return null;
                            }
                            break;
                        default:
                            return null;
                    }

                    //Get the base object to inject
                    var baseObjectDeferred = new Deferred;
                    switch (true){
                        case typeof(base) == 'object':
                            //If base is an object, then inject that object
                            baseObjectDeferred.resolve(base);
                            break;
                        case base == identifier:
                            //If base is the same as the identifier, then load the
                            //underling AMD module
                            require([base], function(baseObject){
                                baseObjectDeferred.resolve(baseObject);
                            });
                            break;
                        case Boolean(this.getIdentifierConfig(base)):
                            //If base is defined in the moduleManager config, then
                            //get that object
                            when(this._get(base), function(baseObject){
                                baseObjectDeferred.resolve(baseObject);
                            });
                            break;
                        default:
                            //Default is to load the AMD module
                            require([base], function(baseObject){
                                baseObjectDeferred.resolve(baseObject);
                            });
                    }

                    //Create object
                    var deferredObject = new Deferred();
                    var index = this._cache.length;

                    if (config.directives.cache){
                        this._cache[index] = {identifier: identifier, object: deferredObject};
                    }

                    baseObjectDeferred.then(lang.hitch(this, function(baseObject){

                        var object;

                        var resolveObject = lang.hitch(this, function(object){
                            if (config.directives.cache){
                                this._cache[index].object = object;
                            }
                            if (config.directives.define){
                                define(identifier, [], function(){return object});
                            }
                            deferredObject.resolve(object);
                        });

                        if (baseObject.prototype){ //check if we can create an instnace
                            if (config.directives.declare){
                                when(this._inject({}, config), lang.hitch(this, function(injectedObject){
                                    object = declare(identifier, [baseObject], injectedObject);
                                    resolveObject(object);
                                }));
                            } else {
                                object = new baseObject;
                                when(this._inject(object, config), lang.hitch(this, function(injectedObject){
                                    resolveObject(injectedObject);
                                }));
                            }
                        } else {
                            if (config.directives.clone){
                                object = lang.clone(baseObject); //Just clone the module
                            } else {
                                object = baseObject;
                            }

                            when(this._inject(object, config), lang.hitch(this, function(injectedObject){
                                when(this._inject(object, config), lang.hitch(this, function(injectedObject){
                                    resolveObject(injectedObject);
                                }));
                            }));
                        }
                    }));

                    return deferredObject;
                },

                _get: function(/*mixed*/ identifier){
                    // summary:
                    //     Used to get an object with the supplied identifier
                    // tags:
                    //     protected

                    var result;

                    switch (true){
                        case typeof(identifier) == 'string':
                            //If identifier is a string, just get the corresponding object

                            //check the cache first
                            result = this._getCached(identifier);
                            if ( ! result){
                                //No cache, so create object
                                result = this._create(identifier);
                            }
                            break;
                        case lang.isArray(identifier):
                            //If identifier is array, then get each identifier in the array, and
                            //return the array
                            var resultArray = lang.clone(identifier);

                            var getArrayItem = lang.hitch(this, function(index){
                                var objectDeferred = new Deferred;
                                when(this._get(identifier[index]), function(object){
                                    resultArray[index] = object;
                                    objectDeferred.resolve();
                                });
                                return objectDeferred;
                            });

                            var objectDeferreds = [];
                            for (var index in identifier){
                                objectDeferreds.push(getArrayItem(index));
                            }

                            result = new Deferred;
                            var objectDeferredsList = new DeferredList(objectDeferreds);
                            objectDeferredsList.then(function(){
                                result.resolve(resultArray);
                            });

                            break;
                        case Boolean(identifier.base):
                            //If identifier is object with base, then it is a nested config
                            result = this._create(identifier);
                            break;
                        default:
                            //Don't know what to do with it, so just pass it back
                            result = identifier;
                    }

                    return result;
                },

                _proxy: function(/*string*/ identifier){
                    // summary:
                    //     Used to get a proxy to the object with the supplied identifier.
                    //     If a cache already exists, that will be returned instead of the
                    //     proxy.
                    // tags:
                    //     protected

                    var object = this._getCached(identifier);
                    if (object && ! utils.isDeferred(object)){
                        return object;
                    }

                    var config = this.getIdentifierConfig(identifier);
                    var proxy = new Proxy(identifier, this);
                    var method;
                    var index;
                    for (index in config.proxyMethods){
                        method = config.proxyMethods[index];
                        proxy[method] = this._proxyMethod(method);
                    }

                    return proxy;
                },

                _proxyMethod: function(/*string*/ method){
                    return function(){
                        var proxyArguments = arguments;
                        var resultDeferred = new Deferred;
                        when(this._moduleManager.get(this._identity), function(object){
                            when(object[method].apply(object, proxyArguments), function(result){
                                resultDeferred.resolve(result);
                            })
                        });
                        return resultDeferred;
                    }
                },

                _getCached: function(/*string*/ identifier){
                    // summary:
                    //     Will return an instance of object with the supplied identifier
                    //     if it already exists. If not, will return null.
                    // tags:
                    //     protected

                    var index;

                    //Check for already created instance
                    for(index in this._cache){
                        if (this._cache[index].identifier == identifier){
                            return this._cache[index].object;
                        }
                    }

                    return null;
                },

                _inject: function(/* object */ object, /* object */ config){
                    // summary:
                    //     Used to inject an object with the objects defined in the
                    //     supplied config
                    //
                    // tags:
                    //     protected

                    //return early if there are no injections to do
                    if ( ! config){
                        return object;
                    }

                    var attr;

                    //Inject prarams
                    lang.mixin(object, config.params);

                    //Inject gets
                    var injectGet = lang.hitch(this, function(getIdentifier, attrGet){
                        var getDeferred = new Deferred;
                        when(this._get(getIdentifier), function(injectionObject){
                            object[attrGet] = injectionObject;
                            getDeferred.resolve();
                        });
                        return getDeferred;
                    });
                    var getsDeferreds = [];
                    for (attr in config.gets){
                        getsDeferreds.push(injectGet(config.gets[attr], attr));
                    }

                    //Inject proxies
                    for (attr in config.proxies){
                        object[attr] = this._proxy(config.proxies[attr]);
                    }

                    //Inject moduleManager, if object is ModuleManagerAware
                    if (object.isModuleManagerAware) {
                        object.moduleManager = this;
                    }

                    if (getsDeferreds.length > 0){
                        var deferredObject = new Deferred();
                        var getsDeferredsList = new DeferredList(getsDeferreds);
                        getsDeferredsList.then(function(){
                            deferredObject.resolve(object);
                        })
                        return deferredObject;
                    } else {
                        return object;
                    }

                    return deferredObject;
                },

                clearCache: function(){
                    // summary:
                    //     Empties the cache

                    this._cache = [];
                },

                mergeConfig: function(/* object */merge){
                    // summary:
                    //     Merge a config object with the existing config object.

                    this._config = utils.mixinDeep(this._config, merge);
                },

                getConfig: function(){
                    // summary:
                    //     Return the complete config object

                    return this._config;
                },

                setConfig: function(/* object */ config){
                    this._config = config;
                },

                setIdentifierConfig: function(/* string */ identifier, /* object */ config) {
                    // summary:
                    //     Set the config object for a particular identifier

                    this._config[identifier] = config;
                },

                getIdentifierConfig: function(/* string */identifier){
                    // summary:
                    //     Return the config object for a particular identifier

                    for(var alias in this._config){
                        if (alias == identifier){
                            return this._config[alias];
                        }
                    }
                    return null;
                },


                get: function(/*string*/ identifier){
                    // summary:
                    //     Return a deferred that will resolve to the identifier requested.
                    //     Will return cached object if one exists.

                    return this._get(identifier);
                },

                proxy: function(/*string*/ identifier){
                    // summary:
                    //     Return a Proxy object that will proxy the identifier requested.

                    return this._proxy(identifier)
                },

                inject: function(/* object */ object, /* string */ identifier){
                    // summary:
                    //     Use inject to inject an object created outside the moduleManager
                    //     with the moduleManager config

                    var config = this.getIdentifierConfig(identifier);
                    if (config){
                        object = this._inject(object, config);
                    }
                    return object;
                }
            }
        );
    }
);
