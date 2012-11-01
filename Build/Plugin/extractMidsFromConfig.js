define(['dojo/_base/lang'], function(lang) {

    return function extractMidsFromConfig(identifier, referenceModule, bc){
        var mids = [];
        var moduleManagerConfig = bc.moduleManager;
        var config;

        switch(true){
            case typeof(getIdentifier) == 'string':
                config = moduleManagerConfig[identifier];
                break;
            case typeof(getIdentifier) == 'object':
                config = lang.clone(identifier);
                identifier = null;
                break;
        }

        // Add module
        switch(true){
            case config.mid:
                mids.push(bc.amdResources[bc.getSrcModuleInfo(config.mid, referenceModule).mid]);
                break;
            case identifier:
                mids.push(bc.amdResources[bc.getSrcModuleInfo(identifier, referenceModule).mid]);
                break;
            default:
                return mids;
        }

        // Also add any other mids from gets config
        var index;
        var getIdentifier;

        for (index in config.gets){
            getIdentifier = config.gets[index];

            switch (true){
                case typeof(getIdentifier) == 'string':
                    mids = mids.concat(extractMidsFromConfig(getIdentifier, referenceModule, bc));
                    break;
                case lang.isArray(getIdentifier):
                    for (var arrayIndex in getIdentifier){
                        mids = mids.concat(extractMidsFromConfig(getIdentifier[arrayIndex], referenceModule, bc));
                    }
                    break;
                case typeof(getIdentifier) == 'object':
                    mids = mids.concat(extractMidsFromConfig(getIdentifier, referenceModule, bc));
                    break;
            }
        }
        return mids;
    }
});

