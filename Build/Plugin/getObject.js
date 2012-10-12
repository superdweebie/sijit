define(['util/build/fileUtils'], function(fileUtils) {
	return {
		start:function(
			mid,
			referenceModule,
			bc
		){

			var result = [bc.amdResources[bc.getSrcModuleInfo("Sds/ServiceManager/Shared/getObject", referenceModule).mid]];

console.log('getObject mid: ' + mid);

            // Load required config modules
            if (bc.mergeConfigs) {

                var index;
                var moduleInfo;
                var config;
                for (index in bc.mergeConfigs) {
                    moduleInfo = bc.getSrcModuleInfo(bc.mergeConfigs[index], referenceModule);
                    config = fileUtils.readAndEval(moduleInfo.url);

console.log(config);
                    result.push(bc.amdResources[moduleInfo.mid]);
                }


            }

            return result;
		}
	};
});
