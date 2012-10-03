define(['dojo/Deferred'], function(Deferred) {
	return {
		start:function(
			mid,
			referenceModule,
			bc
		){
            var resultDeferred = new Deferred;

			var result = [bc.amdResources[bc.getSrcModuleInfo("Sds/ServiceManager/Shared/createObject", referenceModule).mid]];

            resultDeferred.resolve(result);
            return resultDeferred;
		}
	};
});
