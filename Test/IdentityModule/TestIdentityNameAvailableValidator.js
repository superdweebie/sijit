define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/IdentityModule/TestIdentityNameAvailableValidator", require.toUrl("./TestIdentityNameAvailableValidator.html"));
	}
});
