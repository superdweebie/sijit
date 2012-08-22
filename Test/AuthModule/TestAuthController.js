define(["doh", "require"], function(doh, require){
	if(doh.isBrowser){
		doh.register("Sds.Test.AuthModule.TestAuthController", require.toUrl("./TestAuthController.html"));
	}
});
