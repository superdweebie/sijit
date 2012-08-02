define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("sijit.ServiceManager.Test.TestSharedServiceManager", require.toUrl("./TestSharedServiceManager.html"));
	}
});