define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/ModuleManager/Shared/TestProxy", require.toUrl("./TestProxy.html"));
	}
});