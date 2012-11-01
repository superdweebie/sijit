define(['Sds/Build/Plugin/extractMidsFromConfig'], function(extractMidsFromConfig) {

	return {
		start:function(
			mid,
			referenceModule,
			bc
		){

			var result = [bc.amdResources[bc.getSrcModuleInfo("Sds/ModuleManager/Shared/get", referenceModule).mid]];

            // Gather required mids from serviceManager config
            if (bc.serviceManager && bc.serviceManager[mid]) {
                result = result.concat(extractMidsFromConfig(mid, referenceModule, bc));
            }

            return result;
		}
	};
});
