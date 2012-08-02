define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("sijit.ServiceManager.Test.TestSharedCreateObject", require.toUrl("./TestSharedCreateObject.html"));
	}
});