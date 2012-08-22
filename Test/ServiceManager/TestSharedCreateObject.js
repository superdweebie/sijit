define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds.Test.ServiceManager.TestSharedCreateObject", require.toUrl("./TestSharedCreateObject.html"));
	}
});