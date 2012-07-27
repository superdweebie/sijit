define ([
        'dojo/_base/declare',
        'dojo/_base/Deferred',
        'dojo/_base/connect',
        'dojo/_base/lang',
        'sijit/common/Utils',
        'sijit/serviceManager/ServiceManagerAwareMixin',
        'dijit/_Widget'
    ],
    function (
        declare,
        Deferred,
        connect,
        lang,
        Utils,
        ServiceManagerAwareMixin,
        _Widget
    ) {
        // module:
        //		sijit/bootstrap/Bootstrap

        return declare (
            'sijit.bootstrap.Bootstrap',
            [_Widget, ServiceManagerAwareMixin],
            {
                // summary:
                //		Widget for bootstrapping other modules, in particular
                //      the serviceManager

                // config: object
                //		User defined config
                config: undefined,

                mergedConfig: {},

                _unmergedConfigs: [],

                postCreate: function() {
                    // summary:
                    //		Configures the serviceManager

                    // Get config modules
                    if (!(this.config && this.config.mergeConfigs)) {
                        return;
                    }

                    var index;
                    var numToLoad =  this.config.mergeConfigs.length;
                    var loadConfigsDeferred = new Deferred();

                    for (index in this.config.mergeConfigs) {
                        Deferred.when(this.loadConfigModule(this.config.mergeConfigs[index]), function(){
                            --numToLoad;
                            if (numToLoad == 0) {
                                loadConfigsDeferred.resolve();
                            }
                        });
                    }

                    loadConfigsDeferred.then(lang.hitch(this, function(){this._mergeConfigs()}));
                },
                loadConfigModule: function(moduleName) {

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

                    for (var index in this._unmergedConfigs) {
                        this.mergedConfig = Utils.mixinDeep(this.mergedConfig, this._unmergedConfigs[index].config);
                    }
                    this.mergedConfig = Utils.mixinDeep(this.mergedConfig, this.config);
                    this._completeBootstrap();
                },
                _completeBootstrap: function(){

                    if (this.mergedConfig.serviceManager) {
                        var serviceManager = this.serviceManager();
                        serviceManager.setConfig(this.mergedConfig.serviceManager);
                    }
                    this._postBootstrap();
                },
                _postBootstrap: function() {
                    // tags:
                    //		protected
                    connect.publish("postBootstrap", [{}]);
                }
            }
        );
    }
);