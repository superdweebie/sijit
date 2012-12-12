define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/IdentityModule/TestIdentityController", require.toUrl("./TestIdentityController.html"));
	}
});
