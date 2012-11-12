define(['dojo/_base/lang'], function(lang) {

    return function extractMidsFromConfig(identifier, referenceModule, bc){
        var mids = [];
        var moduleManagerConfig = bc.defaultConfig.moduleManager;
        var config;
        var index;

        switch(true){
            case (typeof(identifier) == 'string') && 
                Boolean(moduleManagerConfig[identifier]) && 
                Boolean(moduleManagerConfig[identifier].base):                     
                //string identifier, with config and explicit base
                //extractMids from base and gets
                config = moduleManagerConfig[identifier];                
                mids = mids.concat(extractMidsFromConfig(config.base, referenceModule, bc));
                if (config.gets){
                    for (index in config.gets){
                        mids = mids.concat(extractMidsFromConfig(config.gets[index], referenceModule, bc));           
                    }
                }                 
                break;
            case typeof(identifier) == 'string' && 
                Boolean(moduleManagerConfig[identifier]):                                 
                //string identifier, with config and implicit base
                //assume the identifier is a mid, and add it. Then extractMids from gets
                config = moduleManagerConfig[identifier];
                mids.push(bc.amdResources[bc.getSrcModuleInfo(identifier, referenceModule).mid]);      
                if (config.gets){
                    for (index in config.gets){
                        mids = mids.concat(extractMidsFromConfig(config.gets[index], referenceModule, bc));           
                    }
                }                
                break;
            case typeof(identifier) == 'string' && identifier.split('!').length > 1:
                //string identifier with no config and ! - means it is an AMD plugin                
                var pieces = identifier.split('!');
                var plugin = pieces[0];
                pieces.shift;
                var arg = pieces.join('!');
                
                if (bc.plugins[plugin]){
                    mids = mids.concat(bc.plugins[plugin].start(arg, referenceModule, bc));
                }                                                     
                break;
            case typeof(identifier) == 'string':              
                //string identifier with no config - just plain mid
                //add the mid and return                          
                mids.push(bc.amdResources[bc.getSrcModuleInfo(identifier, referenceModule).mid]);
                break;
            case lang.isArray(identifier):                
                //identifier is an array of identifiers. Process each one individually.
                for (index in identifier){
                    mids = mids.concat(extractMidsFromConfig(identifier[index], referenceModule, bc));
                }               
                break;
            case typeof(identifier) == 'object' && identifier.base:                
                //inline config object
                //extractMid from base and gets
                config = identifier;                
                mids = mids.concat(extractMidsFromConfig(config.base, referenceModule, bc));
                if (config.gets){
                    for (index in config.gets){
                        mids = mids.concat(extractMidsFromConfig(config.gets[index], referenceModule, bc));           
                    }
                }
                break;
            case typeof(identifier) == 'object':
                //just a plain base object. Do nothing
                break;
        }

        return mids;        
    }
});
