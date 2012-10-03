define(function() {
	return {
		start:function(
			mid,
			referenceModule,
			bc
		){
			return [
                bc.amdResources[bc.getSrcModuleInfo("Sds/ServiceManager/Shared/getServiceManager", referenceModule).mid],
                bc.amdResources[bc.getSrcModuleInfo("Sds/ServiceManager/ServiceManager", referenceModule).mid]
            ];
		}
	};
});
