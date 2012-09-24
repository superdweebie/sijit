define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/ServiceManager/TestSharedGetProxy", require.toUrl("./TestSharedGetProxy.html"));
	}
});