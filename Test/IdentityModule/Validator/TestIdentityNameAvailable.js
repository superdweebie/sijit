define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds/Test/IdentityModule/Validator/TestIdentityNameAvailable", require.toUrl("./TestIdentityNameAvailable.html"));
	}
});
