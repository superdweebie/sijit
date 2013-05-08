define ([
    'dojo/_base/config',
    'dojo/_base/array',
    'dojo/Deferred',
    'dojo/DeferredList',
    '../lang',
    '../is',
    './Exception/ConfigNotStatic'
],
function (
    dojoConfig,
    array,
    Deferred,
    DeferredList,
    lang,
    is,
    ConfigNotStatic
) {
    // module:
    //		Sds/ConfigManager/configManager

    var merge = function(mergeConfigs, target) {
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

            var loadConfigsDeferred = new DeferredList(array.map(mergeConfigs, function(configMid){
                return loadConfigModule(configMid);
            }));

            // Merge config modules
            loadConfigsDeferred.then(function(unmergedConfigs){
                mergeDone.resolve(doMerge(unmergedConfigs));
            });
        } else {
            mergeDone.resolve();
        }

        mergeDone.then(function(mergedConfig){
            target = lang.mixinDeep(target, mergedConfig);
            targetMerged.resolve(target);
        });

        return targetMerged;
    };

    function loadConfigModule(moduleName) {
        // summary:
        //		Load a single config module

        var deferredConfig = new Deferred();

        var resolveConfigModule = function(configModule){
            if (configModule.mergeConfigs){
                merge(configModule.mergeConfigs, configModule).then(function(configModule){
                    deferredConfig.resolve(configModule);
                });
            } else {
                deferredConfig.resolve(configModule);
            }
        };

        require([moduleName], function(configModule){
            resolveConfigModule(configModule);
        });

        return deferredConfig;
    }

    function doMerge(unmergedConfigs){
        // summary:
        //		Merge all the configs together
        var mergedConfig = {};

        for (var index in unmergedConfigs) {
            if (is.isStatic(unmergedConfigs[index][1])){
                mergedConfig = lang.mixinDeep(mergedConfig, unmergedConfigs[index][1]);
            } else {
                throw new ConfigNotStatic;
            }
        }
        return mergedConfig;
    }

    return {
        // summary:
        //		Allows the merging of multiple config objects into dojo config.

        merge: merge
    }
});