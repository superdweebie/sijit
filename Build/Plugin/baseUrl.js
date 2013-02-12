define(function() {

    return {
        start:function(
            mid,
            referenceModule,
            bc
        ){

            var result = [bc.amdResources[bc.getSrcModuleInfo("Sds/Router/baseUrl", referenceModule).mid]];

            return result;
        }
    };
});


