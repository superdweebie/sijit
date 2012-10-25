define(['Sds/Build/Plugin/extractMidsFromConfig'], function(extractMidsFromConfig) {

	return {
		start:function(
			mid,
			referenceModule,
			bc
		){

			var result = [bc.amdResources[bc.getSrcModuleInfo("Sds/Router/startedRouter", referenceModule).mid]];

            return result;
		}
	};
});
