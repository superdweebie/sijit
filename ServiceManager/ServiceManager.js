define([
        'dojo/_base/declare',
        'dojo/_base/config',
        'dojo/Deferred',
        'dojo/when',
        'dojo/_base/lang',
        'dijit/registry',
        'dojo/aspect',
        'Sds/ServiceManager/Proxy',
        'Sds/Common/utils'
    ],
    function (
        declare,
        dojoConfig,
        Deferred,
        when,
        lang,
        registry,
        aspect,
        Proxy,
        utils
    ) {
        // module:
        //		Sds/ServiceManager/ServiceManager

        return declare
        (
            'Sds/ServiceManager/ServiceManager',
            null,
            {
                // summary:
                //		An object used for dependency injection.
                //
                // description:
                //		The config property may be populated with a config object that
                //		defines what to inject.
                //
                // example:
                // |    myThingForm: {
                // |        moduleName: 'my/Thing/Form',
                // |        proxyMethods: [
                // |            'get', 'set', 'watch'
                // |        ],
                // |        values: {
                // |            title: 'my formt title'
                // |        },
                // |        createObjects: {
                // |        },
                // |        getObjects: {
                // |            alterApi: 'alertApi'
                // |        },
                // |        proxyObjects: {
                // |            errorManager: 'Sds/ErrorManager/ErrorManager'
                // |        }
                // |    }
                //
                // The above config describes how to create an instance of the 'my/Thing/Form'.
                // When `serviceManager.getObject('myThingForm')` this object will be returned.
                //
                // The moduleName attribute defines which module to load. If not already loaded, it will be loaded
                // async.
                //
                // The proxyMethods array is an array of method names that should be proxied if
                // a Proxy to the is object is created.
                //
                // The values object is an associatvie array of values to inject into the object.
                //
                // The createObjects is an associative array of objects to create with the serviceManager
                // and inject. Once injected, they can be used as normal.
                //
                // The getObjects is an associative array of objects to load with the serviceManager
                // and inject. Once injected, they can be used as normal.
                //
                // The proxyObjects is an associatvie array of objects to inject a Sds.serviceManager.Proxy instance for.
                // An proxyObject doesn't inject the object itself, but a proxy of the object to get or use the object later.
                //
                // proxyObject injections allow the lazy loading of dependencies - they are only
                // loaded when they are called.

                // _instances: array
                //      An array of all object created through the ServiceManager. If an object is requested
                //      more than once, it is retrieved from this array
                _instances: [],

                // _config: Object
                //      The configuration object. Defines what to inject into objects
                _config: {},

                constructor: function(/* object */ config){
                    // summary:
                    //     Attatches to the registry, so that declarively created dijits can be injected
                    aspect.after(registry, 'add', lang.hitch(this, function(widget){this.injectDijit(widget)}), true);

                    this._instances = [];

                    // Default to dojo config object if no config object is supplied
                    if ( ! config) {
                        config = dojoConfig.serviceManager;
                    }

                    this._config = config;
                },
                _createObject: function(/*string*/ identifier) {
                    // summary:
                    //     Used to create an object with the supplied identifier
                    // tags:
                    //     protected

                    var config = this.getObjectConfig(identifier);

                    //Check for moduleName alias
                    var moduleName = identifier;
                    if (config && config.moduleName){
                        moduleName = config.moduleName;
                    }

                    //Create instance
                    var deferredObject = new Deferred();
                    var index = this._instances.length;
                    this._instances[index] = {identifier: identifier, object: null, promise: deferredObject};

                    require([moduleName], lang.hitch(this, function(Module){
                        var object = new Module;
                        when(this._inject(object, config), lang.hitch(this, function(injectedObject){
                            this._instances[index].object = injectedObject;
                            this._instances[index].promise.resolve(injectedObject);
                        }))
                    }));

                    return deferredObject;
                },
                _getObject: function(/*string*/ identifier){
                    // summary:
                    //     Used to get an object with the supplied identifier
                    // tags:
                    //     protected

                    var object = this._getInstantatedObject(identifier);
                    if (object){
                        return object;
                    }

                    //Create instance
                    return this._createObject(identifier);
                },
                _getProxy: function(/*string*/ identifier){
                    // summary:
                    //     Used to get a proxy to the object with the supplied identifier.
                    //     If a shared object already exists, that will be returned instead of the
                    //     proxy.
                    // tags:
                    //     protected

                    var object = this._getInstantatedObject(identifier);
                    if (object){
                        return object;
                    }

                    var config = this.getObjectConfig(identifier);
                    var proxy = new Proxy(identifier, this);
                    var method;
                    var index;
                    for (index in config.proxyMethods){
                        method = config.proxyMethods[index];

                        proxy[method] = this._getProxyMethod(method);
                    }

                    return proxy;
                },
                _getProxyMethod: function(/*string*/ method){
                    return function(){
                        var proxyArguments = arguments;
                        var resultDeferred = new Deferred;
                        when(this._serviceManager.getObject(this._identity), function(object){
                            when(object[method].apply(object, proxyArguments), function(result){
                                resultDeferred.resolve(result);
                            })
                        });
                        return resultDeferred;
                    }
                },
                _getInstantatedObject: function(/*string*/ identifier){
                    // summary:
                    //     Will return an instance of object with the supplied identifier
                    //     if it already exists. If not, will return null.
                    // tags:
                    //     protected

                    var index;

                    //Check for already created instance
                    for(index in this._instances){
                        if (this._instances[index].identifier == identifier){
                            return this._instances[index].object;
                        }
                    }

                    //Check to see if a dijit is wanted
                    var object = this._getRawDijitObject(identifier);
                    if (object) {
                        return this._inject(object, this.getObjectConfig(identifier));
                    }

                    return null;
                },
                _getRawDijitObject: function(/*string*/ identifier){
                    // summary:
                    //     Returns an uninjected dijit
                    // tags:
                    //     protected

                    var config = this.getObjectConfig(identifier);

                    var dijitId = identifier
                    if (config && config.dijitId) {
                        dijitId = config.dijitId;
                    }
                    return registry.byId(dijitId);
                },
                _inject: function(/* object */ object, /* object */ config){
                    // summary:
                    //     Used to inject an object with the objects defined in the
                    //     supplied config
                    //
                    // tags:
                    //     protected

                    //return early if there are not injections to do
                    if ( ! config){
                        return object;
                    }

                    var attr;
                    var deferredObject = new Deferred();
                    var injectionsRemaining = 0;
                    var earlyResolve = false;

                    //Determine how many async object loads need to finish before object is ready
                    if (config.createObjects) {
                        injectionsRemaining += utils.countProperties(config.createObjects);
                    }
                    if (config.getObjects) {
                        injectionsRemaining += utils.countProperties(config.getObjects);
                    }

                    if (injectionsRemaining == 0) {
                        earlyResolve = true;
                    }

                    //Inject variables
                    for (attr in config.values){
                        object[attr] = config.values[attr];
                    }

                    //Inject create objects
                    var injectCreateObject = lang.hitch(this, function(createIdentifier, attrCreate){
                        when(this.createObject(createIdentifier), function(injectionObject){
                            object[attrCreate] = injectionObject;
                            --injectionsRemaining;
                            if (injectionsRemaining == 0){
                                deferredObject.resolve(object);
                            }                            
                        });
                    });
                    for (attr in config.createObjects){
                        injectCreateObject(config.createObjects[attr], attr);
                    } 


                    //Inject get objects
                    var injectGetObject = lang.hitch(this, function(getIdentifier, attrGet){
                        when(this.getObject(getIdentifier), function(injectionObject){
                            object[attrGet] = injectionObject;
                            --injectionsRemaining;
                            if (injectionsRemaining == 0){
                                deferredObject.resolve(object);
                            }                            
                        });
                    });
                    for (attr in config.getObjects){
                        injectGetObject(config.getObjects[attr], attr);
                    }                    

                    //Inject proxy objects
                    for (attr in config.proxyObjects){
                        object[attr] = this._getProxy(config.proxyObjects[attr]);
                    }

                    //Inject serviceManager, if object is ServiceManagerAware
                    if (object.isServiceManagerAware) {
                        object.serviceManager = this;
                    }

                    //Resove deferred if there were no async injections
                    if (earlyResolve) {
                        deferredObject.resolve(object);
                    }
                    return deferredObject;
                },
                clearInstanceCache: function(){
                    // summary:
                    //     Empties the cached instance array

                    this._instances = [];
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
                setObjectConfig: function(/* string */ identifier, /* object */ config) {
                    // summary:
                    //     Set the config object for a particular identifier

                    this._config[identifier] = config;
                },
                getObjectConfig: function(/* string */identifier){
                    // summary:
                    //     Return the config object for a particular identifier

                    for(var alias in this._config){
                        if (alias == identifier){
                            return this._config[alias];
                        }
                    }
                    return null;
                },
                createObject: function(/*string*/ identifier){
                    // summary:
                    //     Create a new instance of identifier.
                    //     Will replace cached copy of identifier, if it exists

                    return this._createObject(identifier);
                },
                getObject: function(/*string*/ identifier){
                    // summary:
                    //     Return a deferred that will resolve to the identifier requested.
                    //     Will return cached instance if one exists.

                    return this._getObject(identifier);
                },
                getProxy: function(/*string*/ identifier){
                    // summary:
                    //     Return a Proxy object that will proxy the identifier requested.

                    return this._getProxy(identifier)
                },
                inject: function(/* object */ object, /* string */ identifier){
                    // summary:
                    //     Use inject to inject an object created outside the serviceManager
                    //     with the serviceManager config

                    var config = this.getObjectConfig(identifier);
                    if (config){
                        object = this._inject(object, config);
                    }
                    return object;
                },
                injectDijit: function(widget){
                    // summary:
                    //     Use injectDijit to inject a dijit instance with the serviceManager config

                    var dijitId = widget.get('id');

                    for(var alias in this._config){
                        var config = this._config[alias];
                        if (alias == dijitId || config.dijitId == dijitId){
                            this._inject(widget, config);
                        }
                    }
                }
            }
        );
    }
);
