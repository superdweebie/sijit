define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/ModuleManager/TestModuleManager", require.toUrl("./TestModuleManager.html"));
	}
});