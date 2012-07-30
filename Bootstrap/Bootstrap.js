define ([
        'dojo/_base/declare',
        'dojo/_base/Deferred',
        'dojo/_base/connect',
        'dojo/_base/lang',
        'sijit/Common/Utils',
        'sijit/ServiceManager/ServiceManager',
        'dijit/_Widget'
    ],
    function (
        declare,
        Deferred,
        connect,
        lang,
        Utils,
        ServiceManager,
        _Widget
    ) {
        // module:
        //		sijit/bootstrap/Bootstrap

        return declare (
            'sijit.Bootstrap.Bootstrap',
            [_Widget],
            {
                // summary:
                //		Widget for bootstrapping other modules, in particular
                //      the serviceManager

                // config: object
                //		User defined config
                config: undefined,

                // mergedConfig:
                //		All the config objects merged together
                mergedConfig: {},

                // _unmergedConfigs:
                //     An array of raw(unmerged) config objects
                _unmergedConfigs: [],

                _serviceManager: undefined,

                postCreate: function() {
                    this.bootstrap();
                },
                bootstrap: function() {
                    // summary:
                    //		Kicks off the bootstrap process

                    var configReady = new Deferred;

                    // Load required config modules
                    if (this.config && this.config.mergeConfigs) {
                        var index;
                        var numToLoad =  this.config.mergeConfigs.length;
                        var loadConfigsDeferred = new Deferred();

                        for (index in this.config.mergeConfigs) {
                            Deferred.when(this._loadConfigModule(this.config.mergeConfigs[index]), function(){
                                --numToLoad;
                                if (numToLoad == 0) {
                                    loadConfigsDeferred.resolve();
                                }
                            });
                        }

                        // Merge config modules
                        loadConfigsDeferred.then(lang.hitch(this, function(){
                            this._mergeConfigs();
                            configReady.resolve();
                        }));
                    } else {
                        configReady.resolve();
                    }

                    configReady.then(lang.hitch(this, function(){
                        this._bootstrapServiceManager();
                        this._postBootstrap();
                    }));
                },
                _loadConfigModule: function(moduleName) {
                    // summary:
                    //		Load a single config module
                    // tags:
                    //		protected

                    var deferredConfig = new Deferred();
                    var index = this._unmergedConfigs.length;
                    this._unmergedConfigs.push({moduleName: moduleName, config: {}, promise: deferredConfig});

                    require([moduleName], lang.hitch(this, function(Config){
                        this._unmergedConfigs[index].config = Config;
                        this._unmergedConfigs[index].promise.resolve();
                    }));

                    return deferredConfig;
                },
                _mergeConfigs: function(){
                    // summary:
                    //		Merge all the configs together
                    // tags:
                    //		protected

                    for (var index in this._unmergedConfigs) {
                        this.mergedConfig = Utils.mixinDeep(this.mergedConfig, this._unmergedConfigs[index].config);
                    }
                    this.mergedConfig = Utils.mixinDeep(this.mergedConfig, this.config);
                },
                _bootstrapServiceManager: function(){
                    // summary:
                    //		Finish the bootstrap process
                    // tags:
                    //		protected

                    if (this.mergedConfig.serviceManager) {
                        this._serviceManager = new ServiceManager();
                        this._serviceManager.setConfig(this.mergedConfig.serviceManager);
                    }
                },
                _postBootstrap: function() {
                    // summary:
                    //		Publish postBootstrap
                    // tags:
                    //		protected
                    connect.publish("postBootstrap", [{
                        serviceManager: this._serviceManager
                    }]);
                }
            }
        );
    }
);