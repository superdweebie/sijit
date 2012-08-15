define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("sijit.ServiceManager.Test.TestSharedGetObject", require.toUrl("./TestSharedGetObject.html"));
	}
});