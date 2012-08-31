define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds.Test.ServiceManager.TestSharedGetRef", require.toUrl("./TestSharedGetRef.html"));
	}
});