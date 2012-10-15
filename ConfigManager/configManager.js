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

            merge: function(mergeConfigs, target) {
                // summary:
                //		Merges multiple config modules
                //
                // mergeConfigs:
                //      optional. Array.
                //      A list of mids to load and merge.
                //      If null, the mergeConfigs key of dojoConfig will be used.
                //
                // target:
                //      optional. Object.
                //      An object to merged the config objects into.
                //      If null, dojoConfig itself will be used.

                // Resolves when target has been merged
                var targetMerged = new Deferred;

                // Resolves when merge is complete
                var mergeDone = new Deferred;

                if ( ! mergeConfigs){
                    mergeConfigs = dojoConfig.mergeConfigs;
                }

                if ( ! target){
                    target = dojoConfig;
                }

                // Load required config modules
                if (mergeConfigs) {
                    var index;
                    var numToLoad =  mergeConfigs.length;
                    var loadConfigsDeferred = new Deferred();
                    var unmergedConfigs = [];
                    for (index = 0; index < numToLoad; index++) unmergedConfigs[index] = undefined;

                    for (index in mergeConfigs) {
                        when(loadConfigModule(mergeConfigs[index], index), function(result){
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
                    target = utils.mixinDeep(target, mergedConfig);
                    targetMerged.resolve(target);
                });

                return targetMerged;
            }
        }
    }
);