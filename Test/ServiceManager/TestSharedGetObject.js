define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds.Test.ServiceManager.TestSharedGetObject", require.toUrl("./TestSharedGetObject.html"));
	}
});