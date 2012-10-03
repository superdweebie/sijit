define(function() {
	return {
		start:function(
			mid,
			referenceModule,
			bc
		){
			var result = [bc.amdResources[bc.getSrcModuleInfo('Sds/ConfigManager/configReady', referenceModule).mid]];

            // Load required config modules
            if (bc.mergeConfigs) {

                var index;
                for (index in bc.mergeConfigs) {
                    result.push(bc.amdResources[bc.getSrcModuleInfo(bc.mergeConfigs[index], referenceModule).mid]);
                }
            }
            return result;
		}
	};
});
