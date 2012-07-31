define ([
        'dojo/_base/declare',
        'dojo/_base/config',
        'dojo/_base/Deferred',
        'dojo/_base/lang',
        'sijit/Common/Utils'
    ],
    function (
        declare,
        dojoConfig,
        Deferred,
        lang,
        Utils
    ) {
        // module:
        //		sijit/ConfigManager/ConfigManager

        return declare (
            'sijit.ConfigManager.ConfigManager',
            null,
            {
                // summary:
                //		Allows the merging of multiple config objects into dojo config.

                merge: function() {
                    // summary:
                    //		Merges multiple config modules

                    // Resolves when dojoConfig is updated
                    var dojoConfigUpdated = new Deferred;

                    // Resolves when merge is complete
                    var mergeDone = new Deferred;

                    // Load required config modules
                    if (dojoConfig.mergeConfigs) {
                        var index;
                        var numToLoad =  dojoConfig.mergeConfigs.length;
                        var loadConfigsDeferred = new Deferred();
                        var unmergedConfigs = [];

                        for (index in dojoConfig.mergeConfigs) {
                            Deferred.when(this._loadConfigModule(dojoConfig.mergeConfigs[index]), function(configModule){
                                unmergedConfigs.push(configModule);
                                --numToLoad;
                                if (numToLoad == 0) {
                                    loadConfigsDeferred.resolve(unmergedConfigs);
                                }
                            });
                        }

                        // Merge config modules
                        loadConfigsDeferred.then(lang.hitch(this, function(unmergedConfigs){
                            mergeDone.resolve(this._doMerge(unmergedConfigs));
                        }));
                    } else {
                        mergeDone.resolve();
                    }

                    mergeDone.then(lang.hitch(this, function(mergedConfig){
                        dojoConfig = Utils.mixinDeep(dojoConfig, mergedConfig);
                        dojoConfigUpdated.resolve(dojoConfig);
                    }));

                    return dojoConfigUpdated;
                },
                _loadConfigModule: function(moduleName) {
                    // summary:
                    //		Load a single config module
                    // tags:
                    //		protected

                    var deferredConfig = new Deferred();

                    require([moduleName], lang.hitch(this, function(configModule){
                        deferredConfig.resolve(configModule);
                    }));

                    return deferredConfig;
                },
                _doMerge: function(unmergedConfigs){
                    // summary:
                    //		Merge all the configs together
                    // tags:
                    //		protected

                    var mergedConfig = {};

                    for (var index in unmergedConfigs) {
                        mergedConfig = Utils.mixinDeep(mergedConfig, unmergedConfigs[index]);
                    }
                    return mergedConfig;
                }
            }
        );
    }
);