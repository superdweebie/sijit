define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds.Test.ServiceManager.TestSharedGetServiceManager", require.toUrl("./TestSharedGetServiceManager.html"));
	}
});