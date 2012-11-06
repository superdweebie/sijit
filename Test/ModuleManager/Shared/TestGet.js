define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/ModuleManager/Shared/TestGet", require.toUrl("./TestGet.html"));
	}
});