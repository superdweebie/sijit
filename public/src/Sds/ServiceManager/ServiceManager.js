define([
        'dojo/_base/declare',
        'dojo/_base/config',
        'dojo/_base/Deferred',
        'dojo/_base/lang',
        'dijit/registry',
        'dojo/aspect',
        'Sds/ServiceManager/RefFactory',
        'Sds/Common/Utils'
    ],
    function (
        declare,
        dojoConfig,
        Deferred,
        lang,
        registry,
        aspect,
        RefFactory,
        Utils
    ) {
        // module:
        //		Sds/ServiceManager/ServiceManager

        return declare
        (
            'Sds.ServiceManager.ServiceManager',
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
                // |        plugins: [
                // |            'Sds/ServiceManager/Plugin/Form'
                // |        ],
                // |        values: {
                // |            title: 'my formt title'
                // |        },
                // |        createObjects: {
                // |        },
                // |        getObjects: {
                // |            alterApi: 'alertApi'
                // |        },
                // |        refObjects: {
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
                // The plugins array is an array of ServiceManager plugins that this object will use.
                // Plugins may add extra methods to the ServiceManager and Ref objects.
                //
                // The values object is an associatvie array of values to inject into the object.
                //
                // The createObjects is an associative array of objects to create with the serviceManager
                // and inject. Once injected, they can be used as normal.
                //
                // The getObjects is an associative array of objects to load with the serviceManager
                // and inject. Once injected, they can be used as normal.
                //
                // The refObjects is an associatvie array of objects to inject a Sds.serviceManager.Ref instance for.
                // An refObject doesn't inject the object itself, but a reference to get or use the object later.
                //
                // refObject injections allow the lazy loading of dependencies - they are only
                // loaded when they are called.

                // _instances: array
                //      An array of all object created through the ServiceManager. If an object is requested
                //      more than once, it is retrieved from this array
                _instances: [],

                // _config: Object
                //      The configuration object. Defines what to inject into objects
                _config: {},

                // _plugins: array
                //      An associtave array of ServiceManager plugins that are loaded
                _plugins: {},

                _refFactory: undefined,

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

                    // Search config for required plugins and load them
                    this._plugins = {};

                    var index;
                    var pluginIndex;
                    for (index in config){
                        if (lang.isArray(config[index].plugins)) {
                            for (pluginIndex in config[index].plugins){
                                this.loadPlugin(config[index].plugins[pluginIndex]);
                            }
                        }
                    }

                    this._refFactory = new RefFactory(this);
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
                        Deferred.when(this._inject(object, config), lang.hitch(this, function(injectedObject){
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

                    var index;

                    //Check for already created instance
                    for(index in this._instances){
                        if (this._instances[index].identifier == identifier){
                            return this._instances[index].object;
                        }
                    }

                    var config = this.getObjectConfig(identifier);

                    //Check to see if a dijit is wanted
                    var object = this._getRawDijitObject(identifier);
                    if (object) {
                        return this._inject(object, config);
                    }

                    //Create instance
                    return this._createObject(identifier);
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
                        injectionsRemaining += Utils.countProperties(config.createObjects);
                    }
                    if (config.getObjects) {
                        injectionsRemaining += Utils.countProperties(config.getObjects);
                    }

                    if (injectionsRemaining == 0) {
                        earlyResolve = true;
                    }

                    //Inject variables
                    for (attr in config.values){
                        object[attr] = config.values[attr];
                    }

                    //Inject create objects
                    for (attr in config.createObjects){
                        var attrCreate = attr;
                        Deferred.when(this.createObject(config.createObjects[attrCreate]), function(injectionObject){
                            object[attrCreate] = injectionObject;
                            --injectionsRemaining;
                            if (injectionsRemaining == 0){
                                deferredObject.resolve(object);
                            }
                        });
                    }

                    //Inject get objects
                    for (attr in config.getObjects){
                        var attrGet = attr;
                        Deferred.when(this.getObject(config.getObjects[attrGet]), function(injectionObject){
                            object[attrGet] = injectionObject;
                            --injectionsRemaining;
                            if (injectionsRemaining == 0){
                                deferredObject.resolve(object);
                            }
                        });
                    }

                    //Inject ref objects
                    for (attr in config.refObjects){

                        // Get required plugins
                        var extendClasses = {};
                        var refConfig = this.getObjectConfig(config.refObjects[attr]);
                        if (refConfig && refConfig.plugins){
                            var index
                            for (index in refConfig.plugins){
                                extendClasses = lang.mixin(extendClasses, this._getRefExtendClasses(refConfig.plugins[index]));
                            }
                        }

                        var extendArray= [];
                        for (index in extendClasses){
                            extendArray.push(extendClasses[index]);
                        }
                        // Use factory to create ref with plugin extensions
                        object[attr] = this._refFactory.create(config.refObjects[attr], extendArray);
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
                _getRefExtendClasses: function(/*string*/ pluginName){

                    var extendClasses = {};
                    if (this._plugins[pluginName].refExtend) {
                        extendClasses[pluginName] = this._plugins[pluginName].refExtend;
                    }

                    //Also get dependencies
                    var index
                    for (index in this._plugins[pluginName].dependencies){
                        extendClasses = lang.mixin(extendClasses, this._getRefExtendClasses(this._plugins[pluginName].dependencies[index]));
                    }

                    return extendClasses;
                },
                loadPlugin: function(pluginName){
                    // summary:
                    //     Mixes a plugin into the ServiceManager

                    // Check if already loaded
                    if (this.hasPlugin(pluginName)){
                        return;
                    }

                    this._plugins[pluginName] = pluginName;
                    require([pluginName], lang.hitch(this, function(Plugin){
                        this._plugins[pluginName] = Plugin;
                        lang.mixin(this, Plugin.serviceManagerMixin);

                        // Load any plugin dependencies
                        var index
                        for (index in Plugin.dependencies){
                            this.loadPlugin(Plugin.dependencies[index]);
                        }
                    }));
                },
                hasPlugin: function(pluginName){
                    // summary:
                    //     Checks if the supplied plugin has been loaded (or is loading)

                    if (this._plugins[pluginName]){
                        return true;
                    }
                    return false;
                },
                clearInstanceCache: function(){
                    // summary:
                    //     Empties the cached instance array

                    this._instances = [];
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
