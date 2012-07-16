define([
        'dojo/_base/declare',
        'dojo/_base/Deferred',
        'dojo/_base/lang',
        'dijit/registry',
        'dojo/aspect',
        'sijit/Utils'
    ],
    function (
        declare,
        Deferred,
        lang,
        registry,
        aspect,
        Utils
    ) {
        // module:
        //		sijit/serviceManager/ServiceManager

        var serviceManager = declare
        (
            'sds.serviceManager.ServiceManager',
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
                // |    errorService: {
                // |        moduleName: 'sijit/errorService/ErrorService',
                // |        vars: {
                // |            dialogTitle: 'Ahhhh Error!'
                // |        }
                // |        syncObj: {
                // |            errorApi: 'errorApi'
                // |        }
                // |        asyncObj: {
                // |            status: 'status',
                // |            errorDialog: 'sds/services/ErrorService/ErrorDialog'
                // |        }
                // |    }
                //
                // The above config describes how to create an instance of the 'sijit/errorService/ErrorService'.
                // When `serviceManager.get('errorService')` this object will be returned.
                //
                // The moduleName attribute defines which module to load. If not already loaded, it will be loaded
                // async.
                //
                // The vars object is an associatvie array of values to inject into the object. In this case,
                // errorService.dialogTitle will be set to 'Ahhhh Error!'
                //
                // The syncObj is an associative array of object to load with the serviceManager and inject. Once injected,
                // they can be used as normal.
                //
                // The asyncObj is an associatvie array of objects to inject loading functions for.
                // An asyncObj doesn't inject the object itself, but four functions:
                //    get
                //    set
                //    watch
                //    use
                //
                // AsyncObj injections allow the lazy loading of dependencies - they are only loaded when they are called.
                //
                // At this point in time, the ServiceManager is meant to be used as a singleton, retrived with
                // `getInstance()`

                // _instances: array
                //      An array of all object created through the ServiceManager. If an object is requested
                //      more than once, it is retrieved from this array
                _instances: [],

                // config: Object
                //      The configuration object. Defines what to inject into objects
                _config: {},


                constructor: function(){
                    // summary:
                    //     Attatches to the registry, so that declarively created dijits can be injected
                    aspect.after(registry, 'add', lang.hitch(this, function(widget){this.injectDijit(widget)}), true);
                },

                _get: function(/* String */identifier){
                    // summary:
                    //     Used to get an object with the supplied identifier
                    // tags:
                    //     protected

                    //Check for already created instance
                    for(var index in this._instances){
                        if (this._instances[index].identifier == identifier){
                            return this._instances[index].object;
                        }
                    }

                    var config = this.getSingleConfig(identifier);

                    //Check to see if a dijit is wanted
                    if (config && config.dijitId){
                        var object = registry.byId(config.dijitId);
                        object = this._inject(object, config);
                        return object;
                    }

                    //Check for moduleName alias
                    var moduleName = identifier;
                    if (config && config.moduleName){
                        moduleName = config.moduleName;
                    }

                    //Create instance
                    var deferredObject = new Deferred();
                    var index = this._instances.length;
                    this._instances[index] = {identifier: identifier, object: deferredObject};

                    require([moduleName], lang.hitch(this, function(Module){
                        var object = new Module;
                        object = this._inject(object, config);
                        this._instances[index].object.resolve(object);
                        this._instances[index].object = object;
                    }));

                    return deferredObject;
                },
                _inject: function(object, config){
                    // summary:
                    //     Used to inject an object
                    //
                    // tags:
                    //     protected

                    //return early if there are not injections to do
                    if (config == undefined){
                        return object;
                    }

                    //Inject variables
                    for (var attr in config.vars){
                        object[attr] = config.vars[attr];
                    }

                    //Inject async object functions
                    for (var attr in config.asyncObj){
                        object[attr] = this._injectAsyncObj(config.asyncObj[attr]);
                    }

                    //Inject sync objects
                    for (var attr in config.syncObj){
                        this.get(config.syncObj[attr]).when(function(syncObj){
                            object[attr] = syncObj;
                        });
                    }
                    return object;
                },
                _injectAsyncObj: function(asyncIdentity){
                    // summary:
                    //     Injects a set of functions that can be used to access an object async
                    //
                    // tags:
                    //      protected

                    return {
                        get: lang.hitch(this, function(){
                            return this.get(asyncIdentity);
                        }),
                        set: lang.hitch(this, function(property, value){
                            return this.set(asyncIdentity, property, value);
                        }),
                        watch: lang.hitch(this, function(property, callback){
                            Deferred.when(this.get(asyncIdentity), function(object){
                                object.watch(property, callback);
                            });
                        }),
                        use: lang.hitch(this, function(callback){
                            Deferred.when(this.get(asyncIdentity), callback);
                        })
                    };
                },
                mergeConfig: function(/* object */merge){
                    // summary:
                    //     Merge a config object with the existing config object.

                    this._config = Utils.mixinDeep(this._config, merge);
                },
                getConfig: function(){
                    // summary:
                    //     Return the complete config object

                    return this._config;
                },
                setConfig: function(/* object */ config){
                    this._config = config;
                },
                setSingleConfig: function(/* string */ identifier, /* object */ config) {
                    // summary:
                    //     Set the config object for a particular identifier
                    
                    this._config[identifier] = config;
                },
                getSingleConfig: function(/* string */identifier){
                    // summary:
                    //     Return the config object for a particular identifier

                    for(var alias in this._config){
                        if (alias == identifier){
                            return this.config[alias];
                        }
                    }
                    return null;
                },
                get: function(identifier){
                    return this._get(identifier);
                },
                set: function(identifier, property, value){
                    Deferred.when(this.get(identifier), function(object){
                        object.set(property, value);
                    });
                },
                watch: function(identifier, property, callback){
                    Deferred.when(this.get(identifier), function(object){
                        object.watch(property, callback);
                    });
                },
                use: function(identifier, callback){
                    Deferred.when(this.get(identifier), callback);
                },
                inject: function(object, identifier){
                    var config = this.getObjectConfig(identifier);
                    if (config){
                        object = this._inject(object, config);
                    }
                    return object;
                },
                injectDijit: function(widget){
                    for(var alias in this.config){
                        var config = this.config[alias];
                        if (config.dijitId == widget.id){
                            this._inject(widget, config);
                        }
                    }
                }
            }
        );
        serviceManager._instance = undefined;
        serviceManager.getInstance = function ()
        {
            if (!serviceManager._instance)
            {
                serviceManager._instance = new serviceManager();
            }
            return serviceManager._instance;
        }
        return serviceManager;
    }
);


