define(function() {
	return {
		start:function(
			mid,
			referenceModule,
			bc
		){
			return bc.amdResources[bc.getSrcModuleInfo("Sds/ModuleManager/Shared/proxy", referenceModule).mid];
		}
	};
});
