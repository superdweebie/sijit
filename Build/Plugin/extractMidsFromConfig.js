define([], function() {

    return function extractMidsFromConfig(alias, referenceModule, bc){
        var mids = [];
        var serviceManagerConfig = bc.serviceManager;
        var aliasConfig = serviceManagerConfig[alias];

        // Add module
        if (aliasConfig.moduleName){
            mids.push(bc.amdResources[bc.getSrcModuleInfo(aliasConfig.moduleName, referenceModule).mid]);
        }

        // Also add any other required modules
        var index;
        var injectAlias;
        for (index in aliasConfig.createObjects){
            injectAlias = aliasConfig.createObjects[index];
            if (serviceManagerConfig[injectAlias]){
                mids = mids.concat(extractMidsFromConfig(injectAlias, referenceModule, bc));
            }
        }

        for (index in aliasConfig.getObjects){
            injectAlias = aliasConfig.getObjects[index];
            if (serviceManagerConfig[injectAlias]){
                mids = mids.concat(extractMidsFromConfig(injectAlias, referenceModule, bc));
            }
        }
        return mids;
    }
});

