define ([
        'dojo/_base/config',
        'dojo/Deferred',
        'dojo/when',
        'Sds/Common/utils'
    ],
    function (
        dojoConfig,
        Deferred,
        when,
        utils
    ) {
        // module:
        //		Sds/ConfigManager/configManager

        function loadConfigModule(moduleName, moduleIndex) {
            // summary:
            //		Load a single config module

            var deferredConfig = new Deferred();

            require([moduleName], function(configModule){
                deferredConfig.resolve({
                    configModule: configModule,
                    moduleIndex: moduleIndex
                });
            });

            return deferredConfig;
        }

        function doMerge(unmergedConfigs){
            // summary:
            //		Merge all the configs together
            var mergedConfig = {};

            for (var index in unmergedConfigs) {
                mergedConfig = utils.mixinDeep(mergedConfig, unmergedConfigs[index]);
            }
            return mergedConfig;
        }

        return {
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
                    for (index = 0; index < numToLoad; index++) unmergedConfigs[index] = undefined;

                    for (index in dojoConfig.mergeConfigs) {
                        when(loadConfigModule(dojoConfig.mergeConfigs[index], index), function(result){
                            unmergedConfigs[result.moduleIndex] = result.configModule;
                            --numToLoad;
                            if (numToLoad == 0) {
                                loadConfigsDeferred.resolve(unmergedConfigs);
                            }
                        });
                    }

                    // Merge config modules
                    loadConfigsDeferred.then(function(unmergedConfigs){
                        mergeDone.resolve(doMerge(unmergedConfigs));
                    });
                } else {
                    mergeDone.resolve();
                }

                mergeDone.then(function(mergedConfig){
                    dojoConfig = utils.mixinDeep(dojoConfig, mergedConfig);
                    dojoConfigUpdated.resolve(dojoConfig);
                });

                return dojoConfigUpdated;
            }
        }
    }
);