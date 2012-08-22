define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds.Test.ServiceManager.TestSharedServiceManager", require.toUrl("./TestSharedServiceManager.html"));
	}
});